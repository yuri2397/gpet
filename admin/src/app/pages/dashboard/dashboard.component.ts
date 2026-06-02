import { Day } from 'src/app/models/day';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { DashboardData } from './dashboard.types';
import { DashboardStatGridComponent } from './components/stat-grid.component';
import { CourseStatusChartComponent } from './components/course-status-chart.component';
import { WeeklyHoursChartComponent } from './components/weekly-hours-chart.component';
import { TopProfessorsComponent } from './components/top-professors.component';
import { TopSallesComponent } from './components/top-salles.component';
import { RecentCoursesComponent } from './components/recent-courses.component';
import { DepartmentFilterComponent } from './components/department-filter.component';

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
    LoadComponent,
    NgApexchartsModule,
    DashboardStatGridComponent,
    CourseStatusChartComponent,
    WeeklyHoursChartComponent,
    TopProfessorsComponent,
    TopSallesComponent,
    RecentCoursesComponent,
    DepartmentFilterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private departementService = inject(DepartementService);

  dashboard = signal<DashboardData | null>(null);
  isLoad = signal(true);
  isLoadChart = signal(true);
  days!: Day[];
  selectedDay = signal(0);
  dayLabel = signal('');
  selectedDepartement = signal<number | null>(null);
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.days = this.departementService.DAYS;
    this.days.push({ id: 7, name: 'Dimanche' });
    this.selectedDay.set(new Date().getDay());
    this.dayLabel.set(
      new Date()
        .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
        .toUpperCase()
    );
    this.getDashboard();
  }

  onDepartementChange(id: number | null): void {
    this.selectedDepartement.set(id);
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
        const preformatted = this.extractPreformattedSeries(response);
        let series: any[];
        let allFree: boolean;

        if (preformatted) {
          series = preformatted;
          allFree = response?.all_free ?? series.every((s) => s.data.every((d: any) => Number(d.y) <= 10));
        } else {
          const events: any[] = Array.isArray(response) ? response : (response?.events ?? []);
          series = this.buildHeatmapSeries(events);
          allFree = series.every((s) => s.data.every((d: any) => d.y === 0));
        }

        this.chartOptions = {
          series,
          chart: {
            height: Math.max(350, series.length * 28 + 80),
            type: 'heatmap',
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif',
          },
          dataLabels: { enabled: false },
          colors: [allFree ? '#e5e7eb' : '#41729f'],
          plotOptions: {
            heatmap: {
              radius: 4,
              enableShades: true,
              shadeIntensity: 0.5,
              colorScale: {
                ranges: [
                  { from: 0, to: 10, color: '#f3f4f6', name: 'Libre' },
                  { from: 11, to: 100, color: '#41729f', name: 'Occupée' },
                ],
              },
            },
          },
          title: {
            text: `Disponibilité des salles | ${this.dayLabel()}`,
            style: { fontFamily: 'Poppins', fontSize: '16px', color: '#111827' },
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

  private extractPreformattedSeries(response: any): any[] | null {
    const candidate = response?.salles_libre ?? response?.series;
    if (!Array.isArray(candidate) || candidate.length === 0) return null;
    const first = candidate[0];
    if (!first || typeof first !== 'object') return null;
    if (!('name' in first) || !Array.isArray(first.data)) return null;
    const firstPoint = first.data[0];
    if (!firstPoint || typeof firstPoint !== 'object' || !('x' in firstPoint) || !('y' in firstPoint)) return null;
    return candidate;
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
    this.departementService.dashboard(this.selectedDepartement()).subscribe({
      next: (response) => {
        this.dashboard.set(response);
        this.isLoad.set(false);
        this.getChartData(this.selectedDay());
      },
      error: (errors) => {
        console.log(errors);
        this.isLoad.set(false);
      },
    });
  }
}
