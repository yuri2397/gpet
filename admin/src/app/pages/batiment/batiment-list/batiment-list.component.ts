import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/services/batiment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BatimentCreateComponent } from '../batiment-create/batiment-create.component';
import { BatimentEditComponent } from './../batiment-edit/batiment-edit.component';
import { AuthStore } from 'src/app/shared/auth-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-batiment-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './batiment-list.component.html',
  styleUrls: ['./batiment-list.component.scss'],
})
export class BatimentListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  private batimentService = inject(BatimentService);
  private authStore = inject(AuthStore);

  batiments = signal<Batiment[]>([]);
  filteredBatiments = signal<Batiment[]>([]);
  selectedBatiment!: Batiment;
  isLoad = signal(true);
  deleteRestoRef!: ModalRef;
  deleteLoad!: boolean;
  searchValue = signal('');
  openDropdownId = signal<string | null>(null);

  toggleDropdown(id: string, event: Event) {
    event.stopPropagation();
    this.openDropdownId.set(this.openDropdownId() === id ? null : id);
  }

  closeDropdown() {
    this.openDropdownId.set(null);
  }

  searchBatiments() {
    const sv = this.searchValue().toLowerCase();
    if (!sv) {
      this.filteredBatiments.set(this.batiments());
    } else {
      this.filteredBatiments.set(this.batiments().filter(b =>
        b.name.toLowerCase().includes(sv)
      ));
    }
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad.set(true);
    this.batimentService.findAll().subscribe({
      next: (batiments: Batiment[]) => {
        this.batiments.set(batiments);
        this.filteredBatiments.set(batiments);
        this.isLoad.set(false);
      },
      error: (errors: any) => {
        this.isLoad.set(false);
      },
    });
  }

  openEditModal(batiment: Batiment) {
    this.selectedBatiment = batiment;
    const modal = this.modalService.open({
      title: 'Modifier le batiment',
      component: BatimentEditComponent,
      data: {
        batiment: this.batimentService.clone(batiment),
      },
    });

    modal.afterClose.subscribe((data: Batiment | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(batiment: Batiment) {
    this.deleteRestoRef = this.modalService.confirm({
      title: 'Voulez-vous supprimé le batiment?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.deleteBatiment(batiment),
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
    const modal = this.modalService.open({
      title: 'Ajouter un batiment',
      component: BatimentCreateComponent,
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
