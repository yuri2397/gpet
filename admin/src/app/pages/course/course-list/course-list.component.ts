import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
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
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-course-list',
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
  IconComponent,
  CanDeleteComponent,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(NzModalService);
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
  deleteRestoRef!: NzModalRef;
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
    const modal = this.modalService.create({
      nzTitle: 'Modifier le cours',
      nzContent: CourseEditComponent,
      nzData: {
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
    if(this.searchValue().length >= 3){
      this.findAll(this.currentPage(), this.pageSize())
    }else{
      this.findAll(1, this.pageSize());
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
      nzData: {
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
    this.canDeleteVisible.set(true);
  }

  onCanDeleteClose() {
    this.canDeleteVisible.set(false);
  }
}
