import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexNonAxisChartSeries, ApexChart, ApexLegend, ApexResponsive } from 'ng-apexcharts';
import { CourseStatusCount } from '../dashboard.types';

const STATUS_COLORS: Record<string, string> = {
  finish: '#10b981',
  load: '#3b82f6',
  wait: '#f59e0b',
  cancel: '#ef4444',
};

@Component({
  selector: 'app-dashboard-course-status-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <h3 class="text-base font-semibold text-gray-800 mb-4">Cours par statut</h3>
      @if (hasData()) {
        <apx-chart
          [series]="series()"
          [chart]="chartConfig"
          [labels]="labels()"
          [colors]="colors()"
          [legend]="legend"
          [responsive]="responsive"
        />
      } @else {
        <div class="flex items-center justify-center h-48 text-sm text-gray-400">Aucune donnée</div>
      }
    </div>
  `,
})
export class CourseStatusChartComponent {
  data = input.required<CourseStatusCount[]>();

  hasData = computed(() => this.data().some((d) => d.count > 0));
  series = computed<ApexNonAxisChartSeries>(() => this.data().map((d) => d.count));
  labels = computed(() => this.data().map((d) => d.label));
  colors = computed(() => this.data().map((d) => STATUS_COLORS[d.code] ?? '#9ca3af'));

  chartConfig: ApexChart = {
    type: 'donut',
    height: 280,
    fontFamily: 'Poppins, sans-serif',
  };

  legend: ApexLegend = {
    position: 'bottom',
    fontSize: '12px',
  };

  responsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { height: 240 },
        legend: { position: 'bottom' },
      },
    },
  ];
}
