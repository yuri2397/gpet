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
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ModalRef } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
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
  private modalService = inject(ModalService);

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
  deleteCourseRef!: ModalRef;

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
    this.modalService.confirm({
      title: 'Attention',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteCourse(course),
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
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Message',
          errors.error.message,
          5000
        );
        this.deleteCourseLoad = false;
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
