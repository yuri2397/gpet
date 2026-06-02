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
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { SelectSearchComponent } from 'src/app/shared/ui/select-search/select-search.component';
import { ModalService, ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  SelectSearchComponent,
  ],
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  courseService = inject(CourseService);
  private modal = inject(ModalRef);
  private profService = inject(ProfessorService);
  private classeService = inject(ClasseService);
  private ecService = inject(ECService);
  private modalService = inject(ModalService);
  private semesterService = inject(SemesterService);
  readonly nzModalData = inject(MODAL_DATA, { optional: true });

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
  classeLocked = false;
  departementLocked = false;

  // Search dropdown state
  profSearchText = '';
  ecSearchText = '';
  selectedProfessor: Professor | null = null;
  selectedEc: EC | null = null;
  showProfDropdown = false;
  showEcDropdown = false;

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

    if (this.classe?.id) {
      this.course.classe_id = this.classe.id;
      this.validateForm.patchValue({ classe_id: this.classe.id });
      this.classeLocked = true;
    }
  }

  departementName(id: number | null | undefined): string {
    if (!id || !this.departements) return '';
    return this.departements.find((d) => d.id == id)?.name ?? '';
  }

  classeName(id: number | null | undefined): string {
    if (!id) return '';
    if (this.classe?.id == id) return this.classe.name;
    if (!this.classes) return '';
    return this.classes.find((c) => c.id == id)?.name ?? '';
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

  professorLabel = (p: Professor) =>
    `#${p.registration_number} — ${p.first_name} ${p.last_name}`;

  professorSublabel = (p: Professor) => p.email ?? '';

  onProSearch(value: string) {
    this.profLoad = true;
    this.profService.search(value).subscribe({
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

  onProfessorChange(prof: Professor | null) {
    this.selectedProfessor = prof;
    this.course.professor_id = (prof?.id ?? null) as any;
    this.validateForm.patchValue({ professor_id: prof?.id ?? null });
    if (!prof) {
      this.professors = [];
    }
  }

  addEc() {
    const modalRef = this.modalService.open({
      title: 'Ajouter un nouveau EC',
      component: EcCreateComponent,
      data: {
        departements: this.departements,
      },
      size: 'lg',
    });

    modalRef.afterClose.subscribe((data) => {});
  }

  onECSearch(value: string) {
    if (value.trim().length > 4) {
      this.ecLoad = true;
      this.showEcDropdown = true;
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

  selectEc(ec: EC) {
    this.selectedEc = ec;
    this.course.ec_id = ec.id;
    this.validateForm.patchValue({ ec_id: ec.id });
    this.showEcDropdown = false;
    this.ecSearchText = '';

    const departementId = ec.ue?.departement_id ?? ec.ue?.departement?.id;
    if (departementId) {
      this.course.departement_id = departementId;
      this.validateForm.patchValue({ departement_id: departementId });
      this.departementLocked = true;
    }
  }

  clearEc() {
    this.selectedEc = null;
    this.course.ec_id = null as any;
    this.validateForm.patchValue({ ec_id: null });
    this.ecSearchText = '';
    this.ecs = [];
    this.departementLocked = false;
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
