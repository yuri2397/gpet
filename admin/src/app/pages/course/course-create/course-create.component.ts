import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { SemesterService } from './../../../services/semester.service';
import { ProfessorService } from './../../../services/professor.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../../models/course';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Service } from 'src/app/models/service';
import { ClasseService } from 'src/app/services/classe.service';
import { EC } from 'src/app/models/ec';
import { ECService } from 'src/app/services/ec.service';
import { EcCreateComponent } from '../../ec/ec-create/ec-create.component';
import { ClasseEditComponent } from '../../classe/classe-edit/classe-edit.component';
import { RouterModule } from '@angular/router';
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
  selector: 'app-course-create',
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
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  courseService = inject(CourseService);
  private modal = inject(NzModalRef);
  private profService = inject(ProfessorService);
  private classeService = inject(ClasseService);
  private ecService = inject(ECService);
  private drawerService = inject(NzDrawerService);
  private semesterService = inject(SemesterService);
  readonly nzModalData = inject(NZ_MODAL_DATA, { optional: true });

  course: Course = new Course();
  validateForm!: FormGroup;
  isLoad: boolean = false;
  isLoadSemester = true;
  isLoadClasse = true;
  professors!: Professor[];
  departements!: Departement[];
  classes!: Classe[];
  courses!: Course[];
  services!: Service[];
  @Input() classe!: Classe;
  ecs!: EC[];
  ecLoad = false;
  profLoad = false;

  ngOnInit(): void {
    if (this.nzModalData?.classe) {
      this.classe = this.nzModalData.classe;
    }
    this.findSelectableList();
      this.findAllClasses();
    this.validateForm = this.fb.group({
      groupe_number: [0, [Validators.required]],
      classe_id: [null, [Validators.required]],
      service_id: [null, [Validators.required]],
      ec_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
      professor_id: [null, null],
    });
  }

  findAllClasses() {
    this.isLoadClasse = true;
    this.classeService.selectClasses().subscribe({
      next: response => {
        this.classes = response;
        this.isLoadClasse = false;
      },
      error: errors => {
        console.log(errors);
      }
    })
  }

  setDefaultClasse() {
    if (this.classe == null) {
      return false;
    }
    this.course.classe_id = this.classe.id;
    this.isLoad = false;
    return true;
  }

  serviceAmout(serviceId: number) {
    if (serviceId == null) return 'Montant (FCFA)';
    let amount!: number;
    this.services.forEach((s) => {
      if (s.id == serviceId) {
        amount = s.amount;
      }
    });
    return amount + ' FCFA';
  }

  onProSearch(value: string) {
    this.profLoad = true;

    if (value.trim().length > 4) {
      this.profService.search(value.trim()).subscribe({
        next: (response) => {
          this.professors = response;
          this.profLoad = false;
        },
        error: (errors) => {
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
          this.profLoad = false;
        },
      });
    }
  }

  addEc() {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ajouter un nouveau EC',
      nzContent: EcCreateComponent,
      nzData: {
        departements: this.departements,
      },
      nzWidth: '350px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {});
  }

  onECSearch(value: string) {
    this.ecLoad = true;
    if (value.trim().length > 4) {
      this.ecService.search(value.trim()).subscribe({
        next: (response) => {
          this.ecs = response;
          this.ecLoad = false;
        },
        error: (errors) => {
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
          this.ecLoad = false;
        },
      });
    }
  }

  findSelectableList() {
    this.isLoad = true;
    this.courseService
      .findSelectableList(['departements', 'services'])
      .subscribe({
        next: (response) => {
          this.departements = response.departements;
          this.services = response.services;
          this.isLoad = false;
        },
        error: (errors) => {
          errors;
          this.isLoad = false;
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
        },
      });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  destroyModal(data: Course | null): void {
    this.modal.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.courseService.create(this.course).subscribe({
      next: (response) => {
        this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'course ajouté avec succés.'
        );
        this.destroyModal(response);
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
        this.destroyModal(null);
      },
    });
  }
}
