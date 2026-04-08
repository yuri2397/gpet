import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseCreateComponent } from './../course-create/course-create.component';
import { CanDeleteComponent } from './../../../shared/ui/can-delete/can-delete.component';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AuthStore } from 'src/app/shared/auth-store';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  CanDeleteComponent,
  DataTableComponent,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  courseService = inject(CourseService);
  private authStore = inject(AuthStore);

  @Output() coursesChange: EventEmitter<Course[]> = new EventEmitter();
  departements!: Departement[];
  classes!: Classe[];
  @Input() courses!: Course[];
  @Input() classe!: Classe;
  @Input() setView!: boolean;
  services!: Service[];
  isLoad = signal(false);
  deleteRestoRef!: ModalRef;
  deleteLoad!: boolean;
  selectedCourse!: Course;
  semesters!: Semester[];
  professors!: Professor[];
  selectableLoad!: boolean;
  canDeleteVisible = signal(false);
  canDeleteMessage!: string;
  response!: CourseResponse;
  searchValue = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  openDropdownId = signal<number | null>(null);

  toggleDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.openDropdownId.set(this.openDropdownId() === id ? null : id);
  }

  closeDropdown() {
    this.openDropdownId.set(null);
  }

  countWithProfessor(): number {
    if (!this.courses) return 0;
    return this.courses.filter(c => c.professor != null).length;
  }

  countWithoutProfessor(): number {
    if (!this.courses) return 0;
    return this.courses.filter(c => c.professor == null).length;
  }

  countGroups(): number {
    if (!this.courses) return 0;
    return this.courses.reduce((sum, c) => sum + (c.groupe_number || 0), 0);
  }

  ngOnInit(): void {
    this.canDeleteInit();
    if (this.courses == null) this.findAll(this.currentPage(), this.pageSize());
  }

  canDeleteInit() {
    this.courseService.canDeleteTitle = 'Pour supprimer ce cour';
    this.courseService.canDeleteErreurs = [
      'Le cour ne doit avoir de professeur.',
      'Le cour ne doit pas avoir de classe.',
    ];
  }

  findAll(page = 1, pageSize = 5) {
    this.isLoad.set(true);
    this.courseService.findAll(page, pageSize, this.searchValue()).subscribe({
      next: (response) => {
         this.response = response;
        this.courses = response.data;
        this.coursesChange.emit(response.data);
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.isLoad.set(false);
      },
    });
  }

  pageChange(index: number){
    this.currentPage.set(index);
    this.pageSize.set(this.response.per_page);
    this.findAll(index, this.response.per_page)
  }

  openEditModal() {
    let c: Course = this.selectedCourse;
    const modal = this.modalService.open({
      title: 'Modifier le cours',
      component: CourseEditComponent,
      data: {
        course: this.courseService.clone(c),
      },
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  search(){
    if(this.searchValue().length >= 3){
      this.findAll(this.currentPage(), this.pageSize())
    }else{
      this.findAll(1, this.pageSize());
    }
  }

  openDeleteModal(course: Course) {
    this.modalService.confirm({
      title: 'Voulez-vous supprimer ce cours?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteCourse(course),
    });
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }

  isSuperAdmin(){
    return this.authStore.isSuperAdmin();
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
      },
      error: (errors) => {
        this.deleteLoad = false;
        this.canNotDelete();
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.open({
      title: 'Ajouter un cours',
      component: CourseCreateComponent,
      data: {
        classe: this.classe,
      },
      size: 'lg',
    });

    modal.afterClose.subscribe((data: Course | null) => {
      if (data != null) {
        this.courses = [...this.courses, data];
      }
    });
  }

  canNotDelete() {
    this.canDeleteMessage = 'Ce cour est lie à une classe et à un professeur.';
    this.canDeleteVisible.set(true);
  }

  onCanDeleteClose() {
    this.canDeleteVisible.set(false);
  }
}
