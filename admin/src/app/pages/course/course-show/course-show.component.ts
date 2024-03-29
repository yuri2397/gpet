import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Course, Media } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { EChartsOption } from 'echarts';
import { Classe } from 'src/app/models/classe';
import { Syllabus } from 'src/app/models/syllabus';
import { RessourceService } from 'src/app/services/ressource.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.scss'],
})
export class CourseShowComponent implements OnInit {
  dataLoad = true;
  errorNetWork = false;
  course: Course = new Course();
  @Input() syllabus!: Syllabus;
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notification: NotificationService,
    private courseService: CourseService,
    private rsService: RessourceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course.id = params['id'];
    });
    this.findCourse();
  }

  findCourseWithEvolution() {
    this.dataLoad = true;
  }

  findCourse() {
    this.dataLoad = true;
    this.courseService.show(this.course).subscribe({
      next: (response) => {
        this.course = response;
        this.setChartData(response);
        console.log(response);

        this.dataLoad = false;
      },
      error: (errors) => {
        this.dataLoad = false;
        this.errorNetWork = true;
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
      },
    });
  }

  setChartData(response: Course) {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    };
  }


  onBack() {
    this.location.back();
  }

  openEditModal() {
    this.router.navigate([
      '/admin/courses/show/syllabus/edit/' + this.course.id,
    ]);
  }

  openCreateModal() {
    this.router.navigate([
      '/admin/courses/show/syllabus/create/' + this.course.id,
    ]);
  }

  openShowModal() {
    this.router.navigate([
      '/admin/courses/show/syllabus/show/' + this.course.id,
    ]);
  }
}
