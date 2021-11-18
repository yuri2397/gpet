import { CourseCreateComponent } from './../course-create/course-create.component';
import { CanDeleteComponent } from './../../../shared/ui/can-delete/can-delete.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { Service } from 'src/app/models/service';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartementCreateComponent } from '../../departement/departement-create/departement-create.component';
import { DepartementEditComponent } from '../../departement/departement-edit/departement-edit.component';
import { Semester } from 'src/app/models/semester';
import { Professor } from 'src/app/models/professor';
import { CourseEditComponent } from '../course-edit/course-edit.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Output() coursesChange: EventEmitter<Course[]> = new EventEmitter();
  departements!: Departement[];
  classes!: Classe[];
  @Input() courses!: Course[];
  services!: Service[];
  isLoad = false;
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  selectedCourse!: Course;
  semesters!: Semester[];
  professors!: Professor[];
  selectableLoad!: boolean;
  canDeleteVisible = false;
  canDeleteMessage!: string;
  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    public courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.canDeleteInit();
    if (this.courses == null) this.findAll();
  }

  canDeleteInit() {
    this.courseService.canDeleteTitle = 'Pour supprimer ce cour';
    this.courseService.canDeleteErreurs = [
      'Le cour ne doit avoir de professeur.',
      'Le cour ne doit pas avoir de classe.',
    ];
  }

  findAll() {
    this.isLoad = true;
    this.courseService.findAll().subscribe({
      next: (response) => {
        this.courses = response;
        this.coursesChange.emit(response);
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        console.log(errors);
        ;
      },
    });
  }

  openEditModal() {
    let c: Course = this.selectedCourse;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le cour',
      nzContent: CourseEditComponent,
      nzComponentParams: {
        course: this.courseService.clone(c),
      },
      nzCentered: true,
      nzWidth: "50em",
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(course: Course) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé ce département?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCourse(course),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteCourse(course: Course) {
    this.deleteLoad = true;
    this.courseService.delete(course).subscribe({
      next: (_) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Dépatement supprimé avec succès.'
        );
        this.findAll();
        this.deleteRestoRef.destroy();
      },
      error: (errors) => {
        this.deleteLoad = false;
        this.deleteRestoRef.destroy();
        this.canNotDelete();
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un cour',
      nzContent: CourseCreateComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '55em',
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  canNotDelete() {
    this.canDeleteMessage = 'Ce cour est lie à une classe et à un professeur.';
    this.canDeleteVisible = true;
  }

  onCanDeleteClose() {
    this.canDeleteVisible = false;
  }
}
