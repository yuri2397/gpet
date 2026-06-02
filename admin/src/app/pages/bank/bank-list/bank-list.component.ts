import { ModalService, ModalRef } from 'src/app/shared/services/modal.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';
import { BankEditComponent } from '../bank-edit/bank-edit.component';
import { BankCreateComponent } from '../bank-create/bank-create.component';
import { AuthStore } from 'src/app/shared/auth-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  private bankService = inject(BankService);
  private notification = inject(NotificationService);
  private modalService = inject(ModalService);
  public roleService = inject(RoleService);
  private authStore = inject(AuthStore);

  banks = signal<Bank[]>([]);
  isLoad = signal(true);
  deleteBankRef!: ModalRef;
  deleteLoad!: boolean;
  searchValue = signal('');
  openDropdownId = signal<number | null>(null);
  filteredBanks = signal<Bank[]>([]);

  toggleDropdown(id: number, event: Event) {
    event.stopPropagation();
    this.openDropdownId.set(this.openDropdownId() === id ? null : id);
  }

  closeDropdown() {
    this.openDropdownId.set(null);
  }

  searchBanks() {
    const sv = this.searchValue().toLowerCase();
    if (!sv) {
      this.filteredBanks.set(this.banks());
    } else {
      this.filteredBanks.set(this.banks().filter(b =>
        b.name.toLowerCase().includes(sv) || b.code.toLowerCase().includes(sv)
      ));
    }
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad.set(true);
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks.set(response);
        this.filteredBanks.set(response);
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.isLoad.set(false);
      },
    });
  }

  openEditModal(bank: Bank) {
    const modal = this.modalService.open({
      title: 'MODIFIER LA BANQUE',
      component: BankEditComponent,
      data: {
        bank: this.bankService.clone(bank)
      },
    });

    modal.afterClose.subscribe((data: Bank | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(bank: Bank) {
    this.deleteBankRef = this.modalService.confirm({
      title: 'Voulez-vous supprimé cette banque?',
      okText: 'Supprimer',
      okDanger: true,
      onOk: () => this.onDeleteBank(bank),
    });
  }

  onDeleteBank(bank: Bank) {
    this.deleteLoad = true;
    this.bankService.delete(bank).subscribe({
      next: (response) => {
        this.deleteLoad = false;
        this.deleteBankRef.destroy(response);
        this.notification.createNotification(
          'success',
          'Notification',
          'Banque supprimée avec succès.',
          5000
        );
        this.findAll();
      },
      error: (errors) => {
        this.notification.createNotification(
          'error',
          'Notification',
          errors.error.message,
          5000
        );
      },
    });
  }

  openCreateModal() {
    const modal = this.modalService.open({
      title: 'Ajouter une banque',
      component: BankCreateComponent,
      data: {},
    });

    modal.afterClose.subscribe((data: Bank | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }
}
