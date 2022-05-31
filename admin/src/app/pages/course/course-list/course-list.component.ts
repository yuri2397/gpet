import { CourseCreateComponent } from './../course-create/course-create.component';
import { CanDeleteComponent } from './../../../shared/ui/can-delete/can-delete.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { Classe } from 'src/app/models/classe';
import { Course, CourseResponse } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { Service } from 'src/app/models/service';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Semester } from 'src/app/models/semester';
import { Professor } from 'src/app/models/professor';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { Permission } from 'src/app/models/permission';

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
  @Input() classe!: Classe;
  @Input() setView!: boolean;
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
  response!: CourseResponse;
  searchValue = '';
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    public courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.canDeleteInit();
    if (this.courses == null) this.findAll(this.currentPage, this.pageSize);
  }

  canDeleteInit() {
    this.courseService.canDeleteTitle = 'Pour supprimer ce cour';
    this.courseService.canDeleteErreurs = [
      'Le cour ne doit avoir de professeur.',
      'Le cour ne doit pas avoir de classe.',
    ];
  }

  findAll(page = 1, pageSize = 5) {
    this.isLoad = true;
    this.pageChange
    this.courseService.findAll(page, pageSize, this.searchValue).subscribe({
      next: (response) => {
         this.response = response;
        this.courses = response.data;
        this.coursesChange.emit(response.data);
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  pageChange(index: number){
    this.currentPage = index;
    this.pageSize = this.response.per_page;
    this.findAll(index, this.response.per_page)
  }

  openEditModal() {
    let c: Course = this.selectedCourse;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le cours',
      nzContent: CourseEditComponent,
      nzComponentParams: {
        course: this.courseService.clone(c),
      },
      nzCentered: true,
      nzWidth: '50em',
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  search(){
    if(this.searchValue.length >= 3){
      this.findAll(this.currentPage, this.pageSize)
    }else{
      this.findAll(1, this.pageSize);
    }
  }

  openDeleteModal(course: Course) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé ce cours?</span>',
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

  can(permission: string){
    let p = new Permission();
    p.name = permission;
    let test = this.courseService.can(p, this.courseService.getPermissions());
    return test;
  }

  isSuperAdmin(){
    return this.courseService.isSuperAdmin();
  }

  deleteCourse(course: Course) {
    this.deleteLoad = true;
    this.courseService.delete(course).subscribe({
      next: (_) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Cours supprimé avec succès.'
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
      nzTitle: 'Ajouter un cours',
      nzContent: CourseCreateComponent,
      nzComponentParams: {
        classe: this.classe,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '55em',
    });

    modal.afterClose.subscribe((data: Course | null) => {
      if (data != null) {
        this.courses = [...this.courses, data];
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
