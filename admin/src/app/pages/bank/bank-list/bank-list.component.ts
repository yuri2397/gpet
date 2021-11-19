import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BankEditComponent } from '../bank-edit/bank-edit.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  banks!: Bank[];
  isLoad = false;
  deleteBankRef!: NzModalRef;
  deleteLoad!: boolean;

  constructor(
    private bankService: BankService,
    private notification: NotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.bankService.findAll().subscribe({
      next: (response) => {
        this.banks = response;

        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  openEditModal(bank: Bank) {

    const modal = this.modalService.create({
      nzTitle: 'MODIFIER LA BANQUE',
      nzContent: BankEditComponent,
      nzComponentParams: {
        bank: this.bankService.clone(bank)
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '40em',
    });

    modal.afterClose.subscribe((data: Bank | null) => {
      if (data != null) {
        this.findAll();
      }
    });
  }

  openDeleteModal(bank: Bank) {
    this.deleteBankRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé cette banque?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteBank(bank),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
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
}
