import { Day } from 'src/app/models/day';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/modules/admin/admin.component';
import { color } from 'echarts';
const OPTIONS = { weekday: 'long' };

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
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.days = this.departementService.DAYS;
    this.days.push({
      id: 7,
      name: "Dimanche"
    });
    this.selectedDay = (new Date).getDay();
    this.dayLabel = (new Date()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
    this.getDashboard();
    this.getChartData(this.selectedDay);
  }

  updateChart(event: number) {
    this.dayLabel = this.days[event - 1].name;
    this.getChartData(event);
  }


  getChartData(event: number) {
    this.isLoadChart = true;
    this.departementService.chartsData(event).subscribe({
      next: response => {
        console.log(response);
        
        this.chartOptions = {
          series: response.salles_libre,
          chart: {
            height: 350,
            type: "heatmap"
          },
          dataLabels: {
            enabled: false
          },
          colors: [response.all_free ? "#eeeeee" : "#41729f"],
          title: {
            text: `Disponibilté des salles | ${this.dayLabel}`,
            style: {
              fontFamily: "Poppins",
              fontSize: "20px",
              color: "#41729f"
            }
          }
        };
        this.isLoadChart = false;
      },
      error: errors => {
        console.log(errors);
        
      }
    })
  }


  getDashboard() {
    this.isLoad = true;
    this.departementService.dashboard().subscribe({
      next: response => {
        this.dashboard = response;

        this.isLoad = false;
      },
      error: errors => {
        console.log(errors);
      }
    })
  }
}
