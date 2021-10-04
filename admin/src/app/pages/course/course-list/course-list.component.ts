import { CourseCreateComponent } from './../course-create/course-create.component';
import { CanDeleteComponent } from './../../../shared/ui/can-delete/can-delete.component';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  departements!: Departement[];
  classes!: Classe[];
  courses!: Course[];
  services!: Service[];
  isLoad = true;
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  selectedCourse!: Course;
  semesters!: Semester[];
  professors!: Professor[];
  selectableLoad!: boolean;

  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
    this.courseService.findAll().subscribe({
      next: (response) => {
        this.courses = response;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        (errors);
      },
    });
  }

  openEditModal(course: Course) {
    this.selectedCourse = course;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le batiment',
      nzContent: DepartementEditComponent,
      nzComponentParams: {
        departement: this.courseService.clone(course),
      },
      nzCentered: true,
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
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
        this.deleteRestoRef.destroy();
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
      nzWidth:"55em"
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }


  canNotDelete(message: string) {
    this.modalService.create({
      nzTitle: 'Impossible de supprimé ce cour',
      nzContent: CanDeleteComponent,
      nzComponentParams: {
        message: message,
      },
      nzCentered: true,
      nzMaskClosable: true,
      nzClosable: true,
      nzFooter: null,
      nzWidth: '40em',
    });
  }
}
