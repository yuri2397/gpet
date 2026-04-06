import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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
import { ProfessorService } from './../../../services/professor.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from 'src/app/models/professor';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component';
import { CourseService } from 'src/app/services/course.service';
import { Permission } from 'src/app/models/permission';
import { Course } from 'src/app/models/course';
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';
import { CourseHistoryComponent } from 'src/app/pages/course/course-history/course-history.component';

@Component({
  selector: 'app-professeur-show',
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
  ErrorServerComponent,
  CourseHistoryComponent,
  ],
  templateUrl: './professeur-show.component.html',
  styleUrls: ['./professeur-show.component.scss'],
})
export class ProfesseurShowComponent implements OnInit {
  private location = inject(Location)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private courseService = inject(CourseService)
  private notification = inject(NotificationService)
  private modalService = inject(NzModalService)
  private profService = inject(ProfessorService)
  private router = inject(Router)

  courses!: Course[]
  coursesLoad = false
  errorServer = false
  reloadCourse = false
  id!: number
  professeur!: Professor
  dataLoad = true
  visibleMenu = false
  hours!: any
  cdDate: any
  addHourForm!: FormGroup
  addCourForm!: FormGroup
  selectedCourse!: Course
  addHourModalVisible = false
  addHourLaod = false
  addHourValidator = false
  addCourse!: Course
  addCourseModalVisible: boolean = false
  deleteCourseLoad!: boolean
  deleteCourseRef!: NzModalRef
  updateStatusLoad = false

  ngOnInit(): void {
    this.addHourForm = this.fb.group({
      hours: [null, [Validators.required]],
      cdDate: [null, [Validators.required]],
    })

    this.addCourForm = this.fb.group({
      course_id: [null, [Validators.required]],
    })

    this.route.params.subscribe((params) => {
      this.id = params['id']
      this.find(this.id)
    })
  }

  submitAddHourForm() {
    for (const i in this.addHourForm.controls) {
      if (this.addHourForm.controls.hasOwnProperty(i)) {
        this.addHourForm.controls[i].markAsDirty()
        this.addHourForm.controls[i].updateValueAndValidity()
      }
    }
  }

  getCourses() {
  }

  submitAddCourseForm() {
    for (const i in this.addCourForm.controls) {
      if (this.addHourForm.controls.hasOwnProperty(i)) {
        this.addHourForm.controls[i].markAsDirty()
        this.addHourForm.controls[i].updateValueAndValidity()
      }
    }
  }

  openAddHourModal(data: Course) {
    this.selectedCourse = data
    this.addHourModalVisible = true
  }

  addHour() {
    this.addHourLaod = true
    this.cdDate
    this.profService
      .courseDo(this.hours, this.cdDate, this.selectedCourse, this.professeur)
      .subscribe({
        next: (_) => {
          this.find(this.id)
          this.addHourLaod = false
          this.notification.createNotification(
            'success',
            'Message',
            "Nombre d'heures ajouté avec succès.",
          )
          this.addHourModalClose()
        },
        error: (errors) => {
          this.addHourLaod = false
          this.notification.createNotification(
            'error',
            'Message',
            errors.error.message,
            5000,
          )
          this.addHourModalClose()
        },
      })
  }

  finishCourse(course: Course) {
    this.modalService.confirm({
      nzTitle: 'Finir un cours',
      nzContent:
        '<b class="bold lead">Attention!!!</b> <br> Si vous marquez ce cours comme terminé, il ne sera plus lié à ce professeur.',
      nzOkText: 'Je confirme',
      nzCancelText: 'Annuler',
      nzCentered: true,
      nzOnOk: () => {
        course.updated = true
        this.courseService.finishCourse(course, 'finish').subscribe({
          next: (response) => {
            console.log(response)

            this.notification.createNotification(
              'success',
              'Notification',
              'Course terminé avec succès.',
            )
            this.find(this.professeur.id)
            course.updated = false
          },
          error: (error) => {
            console.log(error)
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

  resetAddHour() {}

  find(id: number) {
    this.dataLoad = true
    this.errorServer = false
    this.profService.find(id).subscribe({
      next: (professeur) => {
        console.log(professeur)
        this.professeur = professeur
        this.dataLoad = false
      },
      error: (errors) => {
        if (errors.status == 0) {
          this.errorServer = true
        } else {
          this.dataLoad = false
        }
      },
    })
  }

  userProfilePath() {
    if (this.professeur.avatar == null) {
      return '/assets/img/avatar.png'
    }
    return this.profService.host + 'storage' + this.professeur.avatar
  }

  onBack() {
    this.location.back()
  }

  previousMouth() {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth() - 1, 1)
  }

  currentMouth() {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  openEditModal() {
    const modal = this.modalService.create({
      nzTitle: 'Modifier les information',
      nzContent: ProfesseurEditComponent,
      nzData: {
        professor: this.profService.clone(this.professeur),
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '60em',
    })

    modal.afterClose.subscribe((data: Professor | null) => {
      if (data != null) {
        this.professeur = data
      }
    })
  }

  desableAccount() {
    this.profService.desableAccount(this.professeur).subscribe({
      next: (response) => {
        this.professeur = response

        this.notification.createNotification(
          'success',
          'Notification',
          'Compte ' + response.is_active
            ? 'activé'
            : 'désactivé' + ' avec succès.',
        )
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Attention',
          errors.error.message,
        )
      },
    })
  }

  addHourModalClose() {
    this.addHourModalVisible = false
    this.hours = this.cdDate = null
    this.selectedCourse = new Course()
  }

  addCourseForProfessor() {
    this.profService
      .addCourseForProfessor(this.selectedCourse, this.professeur)
      .subscribe({
        next: (response) => {
          this.notification.emit({
            title: 'Notification',
            content: 'Cour affectation avec succès.',
            type: 'success',
          })
          this.addCourseModalVisible = false
          this.find(this.id)
        },
        error: (errors) => {
          this.notification.emit({
            title: 'Notification',
            content: errors.error.message,
            type: 'error',
          })
          this.addCourseModalVisible = false
        },
      })
  }

  openAddCourseModal() {
    this.selectedCourse = new Course()
    this.addCourseModalVisible = true
  }

  openDeleteConf(course: Course) {
    this.selectedCourse = course
    this.deleteCourseRef = this.modalService.confirm({
      nzTitle: 'Attention',
      nzContent:
        '<div class="h6">Supprimer le cour de <i>' +
        course.name +
        '</i>?</div>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCourse(course),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteCourseLoad,
      nzMaskClosable: false,
      nzClosable: false,
    })
  }
  fullName() {
    return this.professeur.first_name + ' ' + this.professeur.last_name
  }

  private deleteCourse(course: Course) {
    this.deleteCourseLoad = true
    this.profService.removeCourse(course).subscribe({
      next: (response) => {
        this.find(this.id)

        this.notification.emit({
          title: 'Notification',
          content:
            'Cour supprimer pour ' +
            this.professeur.first_name +
            ' ' +
            this.professeur.last_name,
          type: 'success',
        })
        this.deleteCourseLoad = false
        this.deleteCourseRef.destroy()
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Attention',
          errors.error.message,
          5000,
        )
        this.deleteCourseLoad = false
        this.deleteCourseRef.destroy()
      },
    })
  }

  onCourseSearch(value: string) {
    this.coursesLoad = true
    if (value.trim().length >= 1) {
      this.courseService.search(value.trim()).subscribe({
        next: (response) => {
          this.courses = response
          this.coursesLoad = false
        },
      })
    }
  }

  currentModel(event: any) {
    this.courses.forEach((c) => {
      if (c.id == event) this.selectedCourse = c
    })
  }

  can(permission: string) {
    let p = new Permission()
    p.name = permission
    let test = this.profService.can(p, this.profService.getPermissions())
    return test
  }

  setAccountStatus() {
    this.updateStatusLoad = true
    this.profService.desableAccount(this.professeur).subscribe({
      next: (response) => {
        this.professeur.is_active = !this.professeur.is_active

        this.notification.emit({
          title: 'Notification',
          content: response.message,
          type: 'success',
        })
        this.updateStatusLoad = false
      },
      error: (errors) => {
        this.updateStatusLoad = false
        this.notification.createNotification(
          'error',
          'Attention',
          errors.error.message,
        )
      },
    })
  }

  isPayable(): boolean {
    return this.professeur.professor_type.name === 'permanent' ? false : true
  }

  openPayementPage() {
    this.router.navigate([
      '/admin/professeurs/payements/' + this.professeur.registration_number,
    ])
  }
}
