import { EcEditComponent } from './../../ec/ec-edit/ec-edit.component';
import { SemesterEditComponent } from './../semester-edit/semester-edit.component';
import { ECService } from 'src/app/services/ec.service';
import { EcCreateComponent } from './../../ec/ec-create/ec-create.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EC } from 'src/app/models/ec';
import { SemesterResponse } from './../../../models/semester-response';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss'],
})
export class SemesterListComponent implements OnInit {
  isLoad = true;

  semesters!: Semester[];
  deleteECRef!: NzModalRef;
  deleteLoad = false;

  constructor(
    private notification: NzNotificationService,
    private semesterService: SemesterService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private ecService: ECService
  ) {}

  ngOnInit(): void {
    this.findByDepartement(this.semesterService.departement());
  }

  findByDepartement(departement: Departement) {
    this.isLoad = true;
    this.semesterService.findByDepartement(departement).subscribe({
      next: (response) => {
        this.semesters = response;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        console.error(errors);
      },
    });
  }

  openCreateModal(semester: Semester) {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ajouter un nouveau EC',
      nzContent: EcCreateComponent,
      nzContentParams: {
        semesters: [...[], semester],
      },
      nzWidth: '500px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.semesterService.departement());
      }
    });
  }

  openEditModal(item: EC, semester: Semester) {
    let modal = this.modalService.create({
      nzTitle: 'Modifier les informations',
      nzContent: EcEditComponent,
      nzComponentParams: {
        semester: semester,
        ec: this.ecService.clone(item),
      },
      nzClosable: false,
      nzCentered: true,
    });
    modal.afterClose.subscribe((data: EC | null) => {
      if (data) {
        this.findByDepartement(this.semesterService.departement());
      }
    });
  }

  onDeleteOk(item: EC, semester: Semester) {
    item.deleted = true;
    this.ecService.delete(item).subscribe({
      next: (response) => {
        this.findByDepartement(this.semesterService.departement());
        this.notification.success('Suppression', 'EC supprimé avec succès.');
      },
      error: (errors) => {
        this.notification.error('Suppression', errors.error.message);
        console.log(errors);
      },
    });
  }
}
