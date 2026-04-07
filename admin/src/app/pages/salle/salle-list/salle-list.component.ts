import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-salle-list',
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
  IconComponent,
  ],
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.scss']
})
export class SalleListComponent implements OnInit {
  private notification = inject(NotificationService);
  private modalService = inject(NzModalService);
  private salleService = inject(SalleService);
  private authStore = inject(AuthStore);

  @Input() salles!: Salle[];
  @Input() setView!: boolean;
  @Input() departement!: Departement;
  dataLoad = signal(true);
  isLoad = signal(false);
  deleteRestoRef!: NzModalRef;
  deleteLoad!: boolean;
  selectedSalle!: Salle;
  searchValue = signal('');
  visible = signal(false);
  listOfDisplayData = signal<Salle[]>([]);

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
    const modal = this.modalService.create({
      nzTitle: 'Modifier le salle',
      nzContent: SalleEditComponent,
      nzData: {
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
