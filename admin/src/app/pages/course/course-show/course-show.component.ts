import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { EChartsOption } from 'echarts';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { SyllabusCreateComponent } from '../../syllabus/syllabus-create/syllabus-create.component';
import { Syllabus } from 'src/app/models/syllabus';
import { SyllabusService } from 'src/app/services/syllabus.service';

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
    private modalService: NzModalService,
    private syllabusService : SyllabusService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course.id = params['id'];
    });
    this.findCourse();
  }

  findCourseWithEvolution(){
    this.dataLoad = true;
  }

  findCourse() {
    this.dataLoad = true;
    this.courseService.show(this.course).subscribe({
      next: (response) => {
        this.course = response;
        this.setChartData(response);
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

  openEditModal() {}

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'Créer le syllabus',
      nzContent: SyllabusCreateComponent,
      nzComponentParams: {
        course: this.course,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '80%',

    });

    modal.afterClose.subscribe((data: Syllabus | null) => {
      if (data != null) {
        [this.syllabusService, data];
      }
    });
    // this.router.navigate(['syllabus/create']);
  }

}
