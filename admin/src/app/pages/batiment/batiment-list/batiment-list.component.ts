import { BatimentEditComponent } from './../batiment-edit/batiment-edit.component';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BatimentCreateComponent } from '../batiment-create/batiment-create.component';

@Component({
  selector: 'app-batiment-list',
  templateUrl: './batiment-list.component.html',
  styleUrls: ['./batiment-list.component.scss'],
})
export class BatimentListComponent implements OnInit {
  batiments!: Batiment[];
  selectedBatiment!: Batiment;
  isLoad = true;
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  constructor(
    private notification: NotificationService,
    private modalService: NzModalService,
    private batimentService: BatimentService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
    this.batimentService.findAll().subscribe({
      next: (batiments: Batiment[]) => {
        this.batiments = batiments;
        this.isLoad = false;
      },
      error: (errors: any) => {
        this.isLoad = false;
      },
    });
  }

  openEditModal(batiment: Batiment) {
    this.selectedBatiment = batiment;
    const modal = this.modalService.create({
      nzTitle: 'Modifier le batiment',
      nzContent: BatimentEditComponent,
      nzComponentParams: {
        batiment: this.batimentService.clone(batiment),
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

  openDeleteModal(batiment: Batiment) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé le batiment?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteBatiment(batiment),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteBatiment(batiment: Batiment) {
    this.deleteLoad = true;
    this.batimentService.delete(batiment).subscribe({
      next: (_) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Batiment supprimé avec succès.'
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
      nzTitle: 'Ajouter un batiment',
      nzContent: BatimentCreateComponent,
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
