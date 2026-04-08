import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { Component, OnInit, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Batiment } from 'src/app/models/batiment';
import { Departement } from 'src/app/models/departement';
import { Salle } from 'src/app/models/salle';
import { NotificationService } from 'src/app/services/notification.service';
import { SalleService } from 'src/app/services/salle.service';
import { AuthStore } from 'src/app/shared/auth-store';
import { SalleCreateComponent } from '../salle-create/salle-create.component';
import { SalleEditComponent } from '../salle-edit/salle-edit.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-salle-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.scss']
})
export class SalleListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  private salleService = inject(SalleService);
  private authStore = inject(AuthStore);

  @Input() salles!: Salle[];
  @Input() setView!: boolean;
  @Input() departement!: Departement;
  dataLoad = signal(true);
  isLoad = signal(false);
  deleteRestoRef!: ModalRef;
  deleteLoad!: boolean;
  selectedSalle!: Salle;
  searchValue = signal('');
  visible = signal(false);
  listOfDisplayData = signal<Salle[]>([]);
  openDropdownId = signal<number | null>(null);

  toggleDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.openDropdownId.set(this.openDropdownId() === id ? null : id);
  }

  closeDropdown() {
    this.openDropdownId.set(null);
  }

  totalCapacity(): number {
    if (!this.salles) return 0;
    return this.salles.reduce((sum, s) => sum + (parseInt(s.capacity, 10) || 0), 0);
  }

  averageCapacity(): number {
    if (!this.salles || this.salles.length === 0) return 0;
    return Math.round(this.totalCapacity() / this.salles.length);
  }

  ngOnInit(): void {
    if (this.salles == null) {
      this.findAll();
    } else {
      this.listOfDisplayData.set(this.salles);
    }
  }

  isSuperAdmin() {
    return this.authStore.isSuperAdmin();
  }

  findAll() {
    this.isLoad.set(true);
    this.salleService.findAll().subscribe({
      next: (salles) => {
        this.salles = salles;
        this.listOfDisplayData.set(salles);
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.isLoad.set(false);
      },
    });
  }

  openEditModal(salle: Salle) {
    this.selectedSalle = salle;
    const modal = this.modalService.open({
      title: 'Modifier le salle',
      component: SalleEditComponent,
      data: {
        salle: this.salleService.clone(salle),
      },
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(salle: Salle) {
    this.deleteRestoRef = this.modalService.confirm({
      title: 'Voulez-vous supprimé ce département?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteSalle(salle),
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
    const modal = this.modalService.open({
      title: 'Ajouter une salle de classe',
      component: SalleCreateComponent,
      data: {},
    });

    modal.afterClose.subscribe((data: Salle | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }

  search(): void {
    this.visible.set(false);
    const sv = this.searchValue().toLowerCase();
    this.listOfDisplayData.set(this.salles.filter((item: Salle) => {
      return (
        item.name.toLowerCase().indexOf(sv) !== -1 ||
        item.number.toLocaleString().indexOf(sv) !== -1
      );
    }));
  }
}
