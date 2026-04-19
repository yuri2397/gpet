import { Day } from 'src/app/models/day';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexPlotOptions } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  LoadComponent,
  NgApexchartsModule,
  StatCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private departementService = inject(DepartementService);

  dashboard = signal<any>(null);
  isLoad = signal(true);
  isLoadChart = signal(true);
  days!: Day[];
  selectedDay = signal(0);
  dayLabel = signal('');
  dashboardLoad = signal(true);
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.days = this.departementService.DAYS;
    this.days.push({
      id: 7,
      name: 'Dimanche',
    });
    this.selectedDay.set(new Date().getDay());
    this.dayLabel.set(new Date()
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
      .toUpperCase());
    this.getDashboard();
  }

  updateChart(event: number) {
    this.dayLabel.set(this.days[event - 1].name);
    this.getChartData(event);
  }

  getChartData(event: number) {
    this.isLoadChart.set(true);
    this.departementService.chartsData(event).subscribe({
      next: (response) => {
        const events: any[] = Array.isArray(response) ? response : (response?.events ?? response?.salles_libre ?? []);
        const series = this.buildHeatmapSeries(events);
        const allFree = series.every((s) => s.data.every((d: any) => d.y === 0));

        this.chartOptions = {
          series,
          chart: {
            height: Math.max(350, series.length * 28 + 80),
            type: 'heatmap',
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
          },
          dataLabels: {
            enabled: false,
          },
          colors: [allFree ? '#e5e7eb' : '#41729f'],
          plotOptions: {
            heatmap: {
              radius: 4,
              enableShades: true,
              shadeIntensity: 0.5,
              colorScale: {
                ranges: [
                  { from: 0, to: 0, color: '#f3f4f6', name: 'Libre' },
                  { from: 1, to: 10, color: '#41729f', name: 'Occupée' },
                ],
              },
            },
          },
          title: {
            text: `Disponibilité des salles | ${this.dayLabel()}`,
            style: {
              fontFamily: 'Poppins',
              fontSize: '16px',
              color: '#111827',
            },
          },
        };
        this.isLoadChart.set(false);
      },
      error: (errors) => {
        console.log(errors);
        this.chartOptions = {
          series: [],
          chart: { height: 350, type: 'heatmap' },
          dataLabels: { enabled: false },
          colors: ['#e5e7eb'],
          title: { text: `Disponibilité des salles | ${this.dayLabel()}` },
        };
        this.isLoadChart.set(false);
      },
    });
  }

  private buildHeatmapSeries(events: any[]): any[] {
    const START_HOUR = 8;
    const END_HOUR = 19;
    const hours: string[] = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      hours.push(`${h.toString().padStart(2, '0')}h`);
    }

    const salleMap = new Map<string, Map<number, number>>();
    for (const ev of events) {
      const salle = ev?.meta?.salle || ev?.title;
      if (!salle) continue;
      const start = this.parseHour(ev.start);
      const end = this.parseHour(ev.end);
      if (start == null || end == null) continue;

      if (!salleMap.has(salle)) {
        salleMap.set(salle, new Map());
      }
      const row = salleMap.get(salle)!;
      const from = Math.max(START_HOUR, Math.floor(start));
      const to = Math.min(END_HOUR, Math.ceil(end) - 1);
      for (let h = from; h <= to; h++) {
        row.set(h, (row.get(h) ?? 0) + 1);
      }
    }

    return Array.from(salleMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([salle, row]) => ({
        name: salle,
        data: hours.map((label, i) => ({
          x: label,
          y: row.get(START_HOUR + i) ?? 0,
        })),
      }));
  }

  private parseHour(value: string): number | null {
    if (!value) return null;
    const m = /\s(\d{1,2}):(\d{2})/.exec(value) ?? /^(\d{1,2}):(\d{2})/.exec(value);
    if (!m) return null;
    return Number(m[1]) + Number(m[2]) / 60;
  }

  getDashboard() {
    this.isLoad.set(true);
    this.departementService.dashboard().subscribe({
      next: (response) => {
        this.dashboard.set(response);
        this.isLoad.set(false);
        this.getChartData(this.selectedDay());
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
