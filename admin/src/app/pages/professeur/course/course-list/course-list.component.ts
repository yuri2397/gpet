import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { NzModalRef, NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-course-list',
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
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressBarModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private notification = inject(NotificationService);
  private professorService = inject(ProfessorService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private profService = inject(ProfessorService);
  private modalService = inject(NzModalService);

  @Input() course!: Course[];
  professor = new Professor();
  isLoad = false;
  errorServer = false;
  addHourForm!: FormGroup;
  hours!: any;
  cdDate: any;
  addHourModalVisible = false;
  addHourLaod = false;
  addHourValidator = false;
  selectedCourse!: Course;
  professeur!: Professor;
  dataLoad = true;
  id!: number;
  deleteCourseLoad!: boolean;
  deleteCourseRef!: NzModalRef;

  ngOnInit(): void {
    this.addHourForm = this.fb.group({
      hours: [null, [Validators.required]],
      cdDate: [null, [Validators.required]],
    });
    this.route.params.subscribe((params) => {
      this.professor.id = params['id'];
    });

    this.findCourses();
  }

  submitAddHourForm() {
    for (const i in this.addHourForm.controls) {
      if (this.addHourForm.controls.hasOwnProperty(i)) {
        this.addHourForm.controls[i].markAsDirty();
        this.addHourForm.controls[i].updateValueAndValidity();
      }
    }
  }

  openAddHourModal(data: Course) {
    this.selectedCourse = data;
    this.addHourModalVisible = true;
  }

  addHour() {
    this.addHourLaod = true;
    this.cdDate;
    this.profService
      .courseDoProf(this.hours, this.cdDate, this.selectedCourse, this.professor)
      .subscribe({
        next: (_) => {
          this.find(this.id);
          this.addHourLaod = false;
          this.notification.createNotification(
            'success',
            'Message',
            "NombreS d'heures ajouté avec succès."
          );
          this.addHourModalClose();
        },
        error: (errors) => {
          this.addHourLaod = false;
          this.notification.createNotification(
            'error',
            'Message',
            errors.error.message,
            5000
          );
          this.addHourModalClose();
        },
      });
  }

  addHourModalClose() {
    this.addHourModalVisible = false;
    this.hours = this.cdDate = null;
    this.selectedCourse = new Course();
  }

  find(id: number) {
    this.dataLoad = true;
    this.errorServer = false;
    this.profService.find(id).subscribe({
      next: (professeur) => {
        console.log(professeur)
        this.professeur = professeur;
        this.dataLoad = false;
      },
      error: (errors) => {
        if (errors.status == 0) {
          this.errorServer = true;
        } else {
          this.dataLoad = false;
        }
      },
    });
  }

  openDeleteConf(course: Course) {
    this.selectedCourse = course;
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
    });
  }

  private deleteCourse(course: Course) {
    this.deleteCourseLoad = true;
    this.profService.removeCourse(course).subscribe({
      next: (response) => {
        this.find(this.id);
        this.notification.createNotification(
          'success',
          'Message',
          'Cour supprimer pour ' +
            this.professeur.first_name +
            ' ' +
            this.professeur.last_name
        );
        this.deleteCourseLoad = false;
        this.deleteCourseRef.destroy();
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Message',
          errors.error.message,
          5000
        );
        this.deleteCourseLoad = false;
        this.deleteCourseRef.destroy();
      },
    });
  }

  findCourses() {
    this.isLoad = true;
    this.professorService.profile().subscribe({
      next: (response) => {
        this.professor = response;
        this.id = this.professor.id;
        this.course = this.professor.courses
        console.log(this.course);
        this.isLoad = false;
        this.errorServer = false;
      },
      error: (errors) => {
        this.errorServer = true;
        this.isLoad = false;
      },
    });
  }
}
