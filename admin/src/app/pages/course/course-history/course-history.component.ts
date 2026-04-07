import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseHistory } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-course-history',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.scss'],
})
export class CourseHistoryComponent implements OnInit {
  private courseService = inject(CourseService)
  private modalService = inject(ModalService)
  private notification = inject(NotificationService)

  @Input('professor') professor!: Professor
  load = false
  histories!: CourseHistory[]

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
      title: 'Restaurer le cours',
      content: `Ce cours est terminé depuis le ${course.created_at.toString()}`,
      okText: 'Je confirme',
      cancelText: 'Annuler',
      onOk: () => {
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
