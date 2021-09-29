import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { Salle } from 'src/app/models/salle';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';
import { SalleCreateComponent } from '../salle-create/salle-create.component';
import { SalleEditComponent } from '../salle-edit/salle-edit.component';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.scss']
})
export class SalleListComponent implements OnInit {
  isLoad = true;
  salles!: Salle[];
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  selectedSalle!: Salle;
  constructor(

    private notification: NotificationService,
    private modalService: NzModalService,
    private salleService: SalleService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
    this.salleService.findAll().subscribe({
      next: (salles) => {
        this.salles = salles;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  openEditModal(salle: Salle) {
    this.selectedSalle = salle;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le salle',
      nzContent: SalleEditComponent,
      nzComponentParams: {
        salle: this.salleService.clone(salle),
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

  openDeleteModal(salle: Salle) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé ce département?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSalle(salle),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteSalle(salle: Salle) {
    this.deleteLoad = true;
    this.salleService.delete(salle).subscribe({
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
      nzTitle: 'Ajouter une salle de classe',
      nzContent: SalleCreateComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Salle | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

}
