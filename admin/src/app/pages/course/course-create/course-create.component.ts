import { ProfessorService } from './../../../services/professor.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../../models/course';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Service } from 'src/app/models/service';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  course: Course = new Course();
  validateForm!: FormGroup;
  isLoad: boolean = false;

  semesters!: Semester[];
  professors!: Professor[];
  departements!: Departement[];
  classes!: Classe[];
  courses!: Course[];
  services!: Service[];
  profLoad = false;
  constructor(
    private notification: NotificationService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private modal: NzModalRef,
    private profService: ProfessorService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.findSelectableList();
    this.validateForm = this.fb.group({
      acronym: [null, [Validators.required]],
      name: [null, [Validators.required]],
      groupe_number: [0, [Validators.required]],
      classe_id: [null, [Validators.required]],
      semester_id: [null, [Validators.required]],
      service_id: [null, [Validators.required]],
      ec_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
      professor_id: [null, null],
    });
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
    if(value.length > 5){
      this.profService.search(value).subscribe({
      next: (response) => {
        this.professors = response;
        this.profLoad= false;
      },
      error: (errors) => {},
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
          console.log('SELECTABLE LIST', response);
          this.isLoad = false;
        },
        error: (errors) => {
          console.log(errors);
          this.isLoad = false;
        },
      });
  }

  findClasseByDepartement(id: number) {
    this.classeService.findByDepartement(id).subscribe({
      next: (response) => {
        this.classes = response;
      },
      error: (errors) => {
        console.log(errors);
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
