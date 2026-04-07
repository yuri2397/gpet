import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseHistory } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-course-history',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
  IconComponent,
  ],
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.scss'],
})
export class CourseHistoryComponent implements OnInit {
  private courseService = inject(CourseService)
  private modalService = inject(NzModalService)
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
