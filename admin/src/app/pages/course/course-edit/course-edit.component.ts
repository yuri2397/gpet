import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { EC } from 'src/app/models/ec';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Service } from 'src/app/models/service';
import { ClasseService } from 'src/app/services/classe.service';
import { CourseService } from 'src/app/services/course.service';
import { ECService } from 'src/app/services/ec.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  semesters!: Semester[];
  professors!: Professor[];
  departements!: Departement[];
  classes!: Classe[];
  courses!: Course[];
  services!: Service[];
  ecs!: EC[];

  @Input() course!: Course;
  validateForm!: FormGroup;
  isLoad: boolean = false;
  ecLoad = false;
  profLoad = false;
  serviceAmountFCFA = 'MONTANT HORAIRE';
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    public courseService: CourseService,
    private modal: NzModalRef,
    private profService: ProfessorService,
    private classeService: ClasseService,
    private ecService: ECService
  ) {}

  ngOnInit(): void {
    this.findSelectableList();
    this.validateForm = this.fb.group({
      groupe_number: [null, [Validators.required]],
      classe_id: [null, [Validators.required]],
      service_id: [null, [Validators.required]],
      ec_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
      professor_id: [null, null],
    });
  }

  serviceAmout(serviceId: number) {
    if (serviceId == null) this.serviceAmountFCFA = 'Montant (FCFA)';
    let amount!: number;
    if (this.services) {
      this.services.forEach((s) => {
        if (s.id == serviceId) {
          amount = s.amount;
        }
      });
      this.serviceAmountFCFA = amount + ' FCFA';
    }
  }

  onProSearch(value: string) {
    this.profLoad = true;

    if (value.trim().length > 2) {
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

  onECSearch(value: string) {
    this.ecLoad = true;
    if (value.trim().length > 2) {
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
      .findSelectableList(['departements', 'services', 'semesters'])
      .subscribe({
        next: (response) => {
          this.departements = response.departements;
          this.services = response.services;
          this.semesters = response.semesters;
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

  findClasseByDepartement(id: number) {
    this.classeService.findByDepartement(id).subscribe({
      next: (response) => {
        this.classes = response;
      },
      error: (errors) => {
        errors;
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
    this.courseService.edit(this.course).subscribe({
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
