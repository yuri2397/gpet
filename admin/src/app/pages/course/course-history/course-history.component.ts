import { NzModalService } from 'ng-zorro-antd/modal'
import { Component, Input, OnInit } from '@angular/core'
import { CourseHistory } from 'src/app/models/course'
import { Professor } from 'src/app/models/professor'
import { CourseService } from 'src/app/services/course.service'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-course-history',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.scss'],
})
export class CourseHistoryComponent implements OnInit {
  @Input('professor') professor!: Professor
  load = false
  histories!: CourseHistory[]
  constructor(
    private courseService: CourseService,
    private modalService: NzModalService,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getHistory()
  }
  getHistory() {
    this.load = true
    this.courseService.courseHistory(this.professor).subscribe({
      next: (response) => {
        this.histories = response
        this.load = false
        console.log(response)
      },
      error: (errors) => {
        this.load = false

        console.log(errors)
      },
    })
  }

  restore(course: CourseHistory) {
    this.modalService.confirm({
      nzTitle: 'Restaurer le cours',
      nzContent: `<span class="lead">Ce est terminé depuis le ${course.created_at.toString()}</span>`,
      nzCentered: true,
      nzOkText: 'Je confirme',
      nzCancelText: 'Annuler',
      nzOnOk: () => {
        course.loading = true
        this.courseService
          .restoreCourseHistory(this.professor, course)
          .subscribe({
            next: (response) => {
              this.notification.createNotification(
                'success',
                'Notification',
                response.message,
              )
              this.getHistory()
            },
            error: (error) => {
              this.notification.createNotification(
                'error',
                'Notification',
                error.error.message,
              )
            },
          })
      },
    })
  }
}
