import { UEService } from './../../../services/ue.service';
import { UeEditComponent } from './../../ue/ue-edit/ue-edit.component';
import { SemesterCreateComponent } from './../semester-create/semester-create.component';
import { EcEditComponent } from './../../ec/ec-edit/ec-edit.component';
import { SemesterEditComponent } from './../semester-edit/semester-edit.component';
import { ECService } from 'src/app/services/ec.service';
import { EcCreateComponent } from './../../ec/ec-create/ec-create.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EC } from 'src/app/models/ec';
import { SemesterResponse } from './../../../models/semester-response';
import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Permission } from 'src/app/models/permission';
import { UE } from 'src/app/models/ue';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss'],
})
export class SemesterListComponent implements OnInit {
  @Input() departement!: Departement;
  isLoad = true;
  deleteError = false;
  deleteMessage = '';
  deleteTitle = "Erreur de suppréssion d'un semestre.";
  deleteSub = 'Impossible de supprimer le semestre';
  erreurs: string[] = [];
  semesters!: Semester[];
  deleteECRef!: NzModalRef;
  deleteLoad = false;
  deleteUELoad = false;

  constructor(
    private notification: NzNotificationService,
    private semesterService: SemesterService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private ecService: ECService,
    private ueService: UEService
  ) {}

  ngOnInit(): void {
    if (!this.departement) {
      this.departement = this.semesterService.departement();
    }
    this.findByDepartement(this.departement);
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

  deleteSemester(semester: Semester) {
    this.deleteError = false;
    this.semesterService.delete(semester).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Vous avez supprimé le semetre avec succès.'
        );
        this.findByDepartement(this.semesterService.departement());
      },
      error: (errors) => {
        this.deleteError = true;
        this.erreurs.push(errors.error.message);
      },
    });
  }

  openEditSemesterModal(semester: Semester) {
    const drawerRef = this.modalService.create({
      nzTitle: 'Modifier le nom du semestre',
      nzContent: SemesterEditComponent,
      nzComponentParams: {
        semester: this.semesterService.clone(semester),
      },
      nzWidth: '500px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openCreateModal(semester: Semester) {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ajouter un nouveau EC',
      nzContent: EcCreateComponent,
      nzContentParams: {
        semesters: [...[], semester],
        departements: [this.departement],
      },
      nzWidth: '500px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openEditUEModal(ue: UE) {
    let modal = this.modalService.create({
      nzTitle: "MODIFIER L'UE",
      nzContent: UeEditComponent,
      nzComponentParams: {
        ue: this.ueService.clone(ue),
      },
    });

    modal.afterClose.subscribe((data: UE | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  deleteUEConfirmed(ue: UE) {
    ue.deleted = true;
    this.ueService.delete(ue).subscribe({
      next: (response) => {
        this.notification.success('Notification', 'UE supprimé avec succès.');
        this.findByDepartement(this.departement);
        ue.deleted = false;
      },
      error: (errors) => {
        console.log(errors);
        ue.deleted = false;
        this.notification.error('Notification', errors.error.message);
      },
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
        this.findByDepartement(this.departement);
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
      },
    });
  }

  openCreateSemesterModal() {
    let modal = this.modalService.create({
      nzTitle: 'AJOUTER UN NOUVEAU SEMESTRE',
      nzContent: SemesterCreateComponent,
      nzComponentParams: {
        departement: this.departement,
      },
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Semester | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.semesterService.can(
      p,
      this.semesterService.getPermissions()
    );
    return test;
  }
}
