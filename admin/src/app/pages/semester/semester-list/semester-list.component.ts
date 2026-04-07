import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { UEService } from 'src/app/services/ue.service';
import { UeEditComponent } from '../../ue/ue-edit/ue-edit.component';
import { SemesterCreateComponent } from '../semester-create/semester-create.component';
import { EcEditComponent } from '../../ec/ec-edit/ec-edit.component';
import { SemesterEditComponent } from '../semester-edit/semester-edit.component';
import { ECService } from 'src/app/services/ec.service';
import { EcCreateComponent } from '../../ec/ec-create/ec-create.component';
import { EC } from 'src/app/models/ec';
import { SemesterResponse } from 'src/app/models/semester-response';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { Permission } from 'src/app/models/permission';
import { UE } from 'src/app/models/ue';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { CanDeleteComponent } from 'src/app/shared/ui/can-delete/can-delete.component';
import { RouterModule } from '@angular/router';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-semester-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  LoadComponent,
  CanDeleteComponent,
  ],
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
  deleteLoad = false;
  deleteUELoad = false;
  activeSemesterIndex = 0;

  private notification = inject(NotificationService);
  private semesterService = inject(SemesterService);
  private modalService = inject(ModalService);
  private ecService = inject(ECService);
  private ueService = inject(UEService);

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
    this.modalService.confirm({
      title: `Etes-vous sur de supprimer ${semester.name.toLocaleUpperCase()} ?`,
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => {
        this.semesterService.delete(semester).subscribe({
          next: (response) => {
            this.notification.createNotification(
              'success',
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
      },
    });
  }

  openEditSemesterModal(semester: Semester) {
    const modalRef = this.modalService.open({
      title: 'Modifier le nom du semestre',
      component: SemesterEditComponent,
      data: {
        semester: this.semesterService.clone(semester),
      },
    });

    modalRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openCreateModal(semester: Semester) {
    const modalRef = this.modalService.open({
      title: 'Ajouter un nouveau EC',
      component: EcCreateComponent,
      data: {
        semesters: [...[], semester],
        departements: [this.departement],
      },
    });

    modalRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openEditUEModal(ue: UE) {
    let modalRef = this.modalService.open({
      title: "MODIFIER L'UE",
      component: UeEditComponent,
      data: {
        ue: this.ueService.clone(ue),
      },
    });

    modalRef.afterClose.subscribe((data: UE | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  deleteUEConfirmed(ue: UE) {
    this.modalService.confirm({
      title: "Etes-vous sur de supprimer cet UE ?",
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => {
        ue.deleted = true;
        this.ueService.delete(ue).subscribe({
          next: (response) => {
            this.notification.createNotification('success', 'Notification', 'UE supprimé avec succès.');
            this.findByDepartement(this.departement);
            ue.deleted = false;
          },
          error: (errors) => {
            console.log(errors);
            ue.deleted = false;
            this.notification.createNotification('error', 'Notification', errors.error.message);
          },
        });
      },
    });
  }

  openEditModal(item: EC, semester: Semester) {
    let modalRef = this.modalService.open({
      title: 'Modifier les informations',
      component: EcEditComponent,
      data: {
        semester: semester,
        ec: this.ecService.clone(item),
      },
    });
    modalRef.afterClose.subscribe((data: EC | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  onDeleteOk(item: EC, semester: Semester) {
    this.modalService.confirm({
      title: "Etes-vous sur de supprimer cet EC ?",
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => {
        item.deleted = true;
        this.ecService.delete(item).subscribe({
          next: (response) => {
            this.findByDepartement(this.semesterService.departement());
            this.notification.createNotification('success', 'Suppression', 'EC supprimé avec succès.');
          },
          error: (errors) => {
            this.notification.createNotification('error', 'Suppression', errors.error.message);
          },
        });
      },
    });
  }

  openCreateSemesterModal() {
    let modalRef = this.modalService.open({
      title: 'AJOUTER UN NOUVEAU SEMESTRE',
      component: SemesterCreateComponent,
      data: {
        departement: this.departement,
      },
    });

    modalRef.afterClose.subscribe((data: Semester | null) => {
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
