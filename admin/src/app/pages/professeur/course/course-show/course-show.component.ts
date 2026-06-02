import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ChartComponent } from 'ng-apexcharts';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-course-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  LoadComponent,
  NgApexchartsModule,
  ],
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.scss'],
})
export class CourseShowComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private location = inject(Location);

  course = new Course();
  isLoad: boolean = true;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: any;

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.course.id = param['id'];
    });
    this.findCourse();
  }

  findCourse() {
    this.isLoad = true;
    this.courseService.show(this.course).subscribe({
      next: (response) => {
        this.course = response;
        console.log(this.course);
        this.chartOptions = {
          series: [
            {
              name: 'Desktops',
              data: [
                {
                  x: 'W1',
                  y: 10,
                },
                {
                  x: 'W2',
                  y: 5,
                },
                {
                  x: 'W3',
                  y: 20,
                },
                {
                  x: 'W4',
                  y: 8,
                },
              ],
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left',
          },
        };
        this.isLoad = false;
      },
      error: (errors) => {
        console.error(errors);
      },
    });
  }

  onBack() {
    this.location.back();
  }
}
