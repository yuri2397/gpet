import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Location } from '@angular/common';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-course-show',
  templateUrl: './course-show.component.html',
  styleUrls: ['./course-show.component.scss'],
})
export class CourseShowComponent implements OnInit {
  dataLoad = true;
  errorNetWork = false;
  course: Course = new Course();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notification: NotificationService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course.id = params['id'];
    });
    this.findCourse();
  }

  findCourse() {
    this.dataLoad = true;
    this.courseService.show(this.course).subscribe({
      next: (response) => {
        this.course = response;
        console.log(this.course);
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

  onBack() {}

  openEditModal(){

  }
}
