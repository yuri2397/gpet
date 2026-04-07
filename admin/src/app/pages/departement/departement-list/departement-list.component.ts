import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Batiment } from 'src/app/models/batiment';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthStore } from 'src/app/shared/auth-store';
import { DepartementCreateComponent } from '../departement-create/departement-create.component';
import { DepartementEditComponent } from '../departement-edit/departement-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss'],
})
export class DepartementListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  private depService = inject(DepartementService);
  private router = inject(Router);
  private authStore = inject(AuthStore);

  departements = signal<Departement[]>([]);
  selectedDepartement!: Departement;
  isLoad = signal(true);
  deleteLoad!: boolean;

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad.set(true);
    this.depService.findAll().subscribe({
      next: (departements) => {
        this.departements.set(departements);
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.isLoad.set(false);
      },
    });
  }

  openEditModal(batiment: Departement) {
    this.selectedDepartement = batiment;
    const modal = this.modalService.open({
      title: 'Modifier le batiment',
      component: DepartementEditComponent,
      data: {
        departement: this.depService.clone(batiment),
      },
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(departement: Departement) {
    this.modalService.confirm({
      title: 'Voulez-vous supprimé ce département?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteDepartement(departement),
      cancelText: 'Annuler',
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
      },
      error: (errors) => {
        this.deleteLoad = false;
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message
        );
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.open({
      title: 'Ajouter un département',
      component: DepartementCreateComponent,
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }
}
