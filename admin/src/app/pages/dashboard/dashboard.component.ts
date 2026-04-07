import { Day } from 'src/app/models/day';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexPlotOptions } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
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
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
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
