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
        console.log(response);

        this.chartOptions = {
          series: response.salles_libre,
          chart: {
            height: 350,
            type: 'heatmap',
          },
          dataLabels: {
            enabled: false,
          },
          colors: [response.all_free ? '#eeeeee' : '#41729f'],
          title: {
            text: `Disponibilté des salles | ${this.dayLabel()}`,
            style: {
              fontFamily: 'Poppins',
              fontSize: '20px',
              color: '#41729f',
            },
          },
        };
        this.isLoadChart.set(false);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
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
