import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
} from 'ng-apexcharts';
import { WeeklyHourPoint } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-weekly-hours-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div class="flex items-baseline justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">Heures effectuées (7 derniers jours)</h3>
        <span class="text-xs text-gray-400">Total: {{ totalHours() }}h</span>
      </div>
      <apx-chart
        [series]="series()"
        [chart]="chartConfig"
        [xaxis]="xaxis()"
        [yaxis]="yaxis"
        [plotOptions]="plotOptions"
        [dataLabels]="dataLabels"
        [tooltip]="tooltip"
        [colors]="['#3b82f6']"
      />
    </div>
  `,
})
export class WeeklyHoursChartComponent {
  data = input.required<WeeklyHourPoint[]>();

  totalHours = computed(() => this.data().reduce((sum, p) => sum + p.hours, 0));

  series = computed<ApexAxisChartSeries>(() => [
    { name: 'Heures', data: this.data().map((p) => p.hours) },
  ]);

  xaxis = computed<ApexXAxis>(() => ({
    categories: this.data().map((p) => this.formatDate(p.date)),
    labels: { style: { fontSize: '11px' } },
  }));

  chartConfig: ApexChart = {
    type: 'bar',
    height: 280,
    toolbar: { show: false },
    fontFamily: 'Poppins, sans-serif',
  };

  yaxis: ApexYAxis = {
    labels: { style: { fontSize: '11px' } },
  };

  plotOptions: ApexPlotOptions = {
    bar: { borderRadius: 6, columnWidth: '45%' },
  };

  dataLabels: ApexDataLabels = { enabled: false };

  tooltip: ApexTooltip = {
    y: { formatter: (v) => `${v} h` },
  };

  private formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit' });
  }
}
