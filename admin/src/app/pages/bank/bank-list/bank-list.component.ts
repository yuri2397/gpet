import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role.service';
import { BankEditComponent } from '../bank-edit/bank-edit.component';
import { Permission } from 'src/app/models/permission';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatProgressBarModule,
  ],
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  private bankService = inject(BankService);
  private notification = inject(NotificationService);
  private modalService = inject(NzModalService);
  public roleService = inject(RoleService);

  banks!: Bank[];
  isLoad = true;
  deleteBankRef!: NzModalRef;
  deleteLoad!: boolean;

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoad = true;
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
      nzData: {
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

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.roleService.can(p, this.bankService.getPermissions());
    return test;
  }
}
