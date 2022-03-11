import { SemesterService } from './../../../services/semester.service';
import { ProfessorService } from './../../../services/professor.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../../models/course';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Service } from 'src/app/models/service';
import { ClasseService } from 'src/app/services/classe.service';
import { EC } from 'src/app/models/ec';
import { ECService } from 'src/app/services/ec.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { EcCreateComponent } from '../../ec/ec-create/ec-create.component';
import { ClasseEditComponent } from '../../classe/classe-edit/classe-edit.component';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
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
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    public courseService: CourseService,
    private modal: NzModalRef,
    private profService: ProfessorService,
    private classeService: ClasseService,
    private ecService: ECService,
    private drawerService: NzDrawerService,
    private semesterService: SemesterService
  ) {}

  ngOnInit(): void {
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
      nzContentParams: {
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
