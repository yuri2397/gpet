import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Course } from 'src/app/models/course';
import { ChartOptions } from 'src/app/modules/admin/admin.component';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.scss'],
})
export class CourseShowComponent implements OnInit {
  course = new Course();
  isLoad: boolean = true;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) {}

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
