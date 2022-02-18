import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/admin/admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboard!: any;
  isLoad = true;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>
  constructor(private departementService: DepartementService) {}

  ngOnInit(): void {
    this.getDashboard();
    this.chartOptions = {
      series: [
        {
          name: "08:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "09:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "10:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "11:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "12:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "13:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "14:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "15:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "16:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "17:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: "18:00",
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        }

      ],
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#41729f"],
      title: {
        text: "Salles Libres"
      }
    };
  }

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  getDashboard(){
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
