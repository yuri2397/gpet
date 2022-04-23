import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/modules/admin/admin.component';
import { color } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboard!: any;
  isLoad = true;
  isLoadChart = true;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  constructor(private departementService: DepartementService) {}

  ngOnInit(): void {
    this.getDashboard();

  }


  getDashboard(){
    this.isLoad = true;
    this.departementService.dashboard().subscribe({
      next: response => {
        this.dashboard = response;
        this.chartOptions = {
          series: response.salles_libre,
          chart: {
            height: 350,
            type: "heatmap"
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#41729f"],
          title: {
            text: "Salles Libres",
            style: {
              fontFamily: "Poppins",
              fontSize: "20px",
              color: "#41729f"
            }
          }
        };
        this.isLoad = false;
      },
      error: errors => {
        console.log(errors);
      }
    })
  }
}
