import { Course } from './../../../models/course'
import { ProfessorService } from './../../../services/professor.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Professor } from 'src/app/models/professor'
import { Location } from '@angular/common'
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal'
import { NotificationService } from 'src/app/services/notification.service'
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component'
import { CourseService } from 'src/app/services/course.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Permission } from 'src/app/models/permission'

@Component({
  selector: 'app-professeur-show',
  templateUrl: './professeur-show.component.html',
  styleUrls: ['./professeur-show.component.scss'],
})
export class ProfesseurShowComponent implements OnInit {
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
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService,
    private notification: NotificationService,
    private modalService: NzModalService,
    private profService: ProfessorService,
    private router: Router,
  ) {}

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
    // console.log('HOS')
    // this.reloadCourse = true
    // this.courseService.showBy({ professor_id: this.professeur.id }).subscribe({
    //   next: (response) => (
    //     (this.professeur.courses = [...response]), (this.reloadCourse = false)
    //   ),
    //   error: (error) => {
    //     console.log(error)
    //   },
    // })
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
      nzComponentParams: {
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
