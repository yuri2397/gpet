import { DepartementCreateComponent } from './../departement-create/departement-create.component';
import { Departement } from './../../../models/departement';
import { DepartementService } from './../../../services/departement.service';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { BatimentCreateComponent } from '../../batiment/batiment-create/batiment-create.component';
import { BatimentEditComponent } from '../../batiment/batiment-edit/batiment-edit.component';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartementEditComponent } from '../departement-edit/departement-edit.component';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss'],
})
export class DepartementListComponent implements OnInit {
  departements!: Departement[];
  selectedDepartement!: Departement;
  isLoad = true;
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;

  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    private depService: DepartementService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
    this.depService.findAll().subscribe({
      next: (departements) => {
        this.departements = departements;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  openEditModal(batiment: Departement) {
    this.selectedDepartement = batiment;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le batiment',
      nzContent: DepartementEditComponent,
      nzComponentParams: {
        departement: this.depService.clone(batiment),
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

  openDeleteModal(departement: Departement) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé ce département?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteDepartement(departement),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteDepartement(departement: Departement) {
    this.deleteLoad = true;
    this.depService.delete(departement).subscribe({
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
      nzTitle: 'Ajouter un département',
      nzContent: DepartementCreateComponent,
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
}
