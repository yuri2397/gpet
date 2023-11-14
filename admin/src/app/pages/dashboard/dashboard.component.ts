import { Day } from 'src/app/models/day';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/modules/admin/admin.component';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { DetailTimeTableComponent } from './detail-time-table/detail-time-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboard!: any;
  isLoad = true;
  isLoadChart = true;
  days!: Day[];
  selectedDay!: number;
  dayLabel!: String;
  dashboardLoad = true;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  constructor(private departementService: DepartementService, private drawer: NzDrawerService) {}

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

 
  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    
  ];

  ngOnInit(): void {
    this.days = this.departementService.DAYS;
    this.days.push({
      id: 7,
      name: 'Dimanche',
    });
    this.selectedDay = new Date().getDay();
    this.dayLabel = new Date()
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
      .toUpperCase();
    this.getDashboard();
  }

  updateChart(event: number) {
    this.dayLabel = this.days[event - 1].name;
    this.getChartData(event);
  }

  handleClick(dataEvent: any){
    console.log(dataEvent.event);
    this.drawer.create({
      nzTitle: 'Detail',
      nzContent: DetailTimeTableComponent,
      nzContentParams: {
        data: dataEvent.event
      }
    });
  }

   getColorName(className: string): string | null {
    const colorMap: Record<string, string> = {
        'color-purple': 'purple',
        'color-geekblue': '#41729f',
        'color-orange': '#d46b08',
        'color-volcano': '#d4380d',
        'color-default': '#eee',
        'color-green': '#389e0d',
        'color-red': '#cf1322',
    };

    // Récupère la couleur correspondante à la classe
    const color = colorMap[className];

    // Retourne le nom de la couleur si elle existe, sinon null
    return color || null;
}

  getChartData(event: number) {
    this.isLoadChart = true;
    this.departementService.chartsData(event).subscribe({
      next: (response: any[]) => {
        console.log(response);
        this.events = [
         ...response.map((item)=>{
            return {
              title: item.title,
              start: new Date(item.start),
              end: new Date(item.end),
              meta: item.meta,
              color: {
                primary: item.color,
                secondary:  item.color,
              },
            }
         })
        ];
        this.refresh.next();

        // this.chartOptions = {
        //   series: response.salles_libre,
        //   chart: {
        //     height: 450,
        //     type: 'heatmap',
        //   },
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   colors: [response.all_free ? '#eeeeee' : '#41729f'],
        //   title: {
        //     text: `Disponibilté des salles | ${this.dayLabel}`,
        //     style: {
        //       fontFamily: 'Poppins',
        //       fontSize: '20px',
        //       color: '#41729f',
        //     },
        //   },
        // };
        this.isLoadChart = false;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

   radomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  getDashboard() {
    this.isLoad = true;
    this.departementService.dashboard().subscribe({
      next: (response) => {
        console.log(response);
        this.dashboard = response;
        this.isLoad = false;
        
        this.getChartData(this.selectedDay);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
