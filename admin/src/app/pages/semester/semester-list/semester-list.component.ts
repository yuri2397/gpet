import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { UEService } from 'src/app/services/ue.service';
import { UeEditComponent } from '../../ue/ue-edit/ue-edit.component';
import { SemesterCreateComponent } from '../semester-create/semester-create.component';
import { EcEditComponent } from '../../ec/ec-edit/ec-edit.component';
import { SemesterEditComponent } from '../semester-edit/semester-edit.component';
import { ECService } from 'src/app/services/ec.service';
import { EcCreateComponent } from '../../ec/ec-create/ec-create.component';
import { EC } from 'src/app/models/ec';
import { SemesterResponse } from 'src/app/models/semester-response';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';
import { Permission } from 'src/app/models/permission';
import { UE } from 'src/app/models/ue';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { CanDeleteComponent } from 'src/app/shared/ui/can-delete/can-delete.component';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
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

@Component({
  selector: 'app-semester-list',
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
  LoadComponent,
  CanDeleteComponent,
  ],
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss'],
})
export class SemesterListComponent implements OnInit {
  @Input() departement!: Departement;
  isLoad = true;
  deleteError = false;
  deleteMessage = '';
  deleteTitle = "Erreur de suppréssion d'un semestre.";
  deleteSub = 'Impossible de supprimer le semestre';
  erreurs: string[] = [];
  semesters!: Semester[];
  deleteECRef!: NzModalRef;
  deleteLoad = false;
  deleteUELoad = false;

  private notification = inject(NzNotificationService);
  private semesterService = inject(SemesterService);
  private modalService = inject(NzModalService);
  private drawerService = inject(NzDrawerService);
  private ecService = inject(ECService);
  private ueService = inject(UEService);

  ngOnInit(): void {
    if (!this.departement) {
      this.departement = this.semesterService.departement();
    }
    this.findByDepartement(this.departement);
  }

  findByDepartement(departement: Departement) {
    this.isLoad = true;
    this.semesterService.findByDepartement(departement).subscribe({
      next: (response) => {
        this.semesters = response;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        console.error(errors);
      },
    });
  }

  deleteSemester(semester: Semester) {
    this.deleteError = false;
    this.semesterService.delete(semester).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Vous avez supprimé le semetre avec succès.'
        );
        this.findByDepartement(this.semesterService.departement());
      },
      error: (errors) => {
        this.deleteError = true;
        this.erreurs.push(errors.error.message);
      },
    });
  }

  openEditSemesterModal(semester: Semester) {
    const drawerRef = this.modalService.create({
      nzTitle: 'Modifier le nom du semestre',
      nzContent: SemesterEditComponent,
      nzData: {
        semester: this.semesterService.clone(semester),
      },
      nzWidth: '500px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openCreateModal(semester: Semester) {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Ajouter un nouveau EC',
      nzContent: EcCreateComponent,
      nzContentParams: {
        semesters: [...[], semester],
        departements: [this.departement],
      },
      nzWidth: '500px',
      nzClosable: false,
      nzMaskClosable: false,
    });

    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  openEditUEModal(ue: UE) {
    let modal = this.modalService.create({
      nzTitle: "MODIFIER L'UE",
      nzContent: UeEditComponent,
      nzData: {
        ue: this.ueService.clone(ue),
      },
    });

    modal.afterClose.subscribe((data: UE | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  deleteUEConfirmed(ue: UE) {
    ue.deleted = true;
    this.ueService.delete(ue).subscribe({
      next: (response) => {
        this.notification.success('Notification', 'UE supprimé avec succès.');
        this.findByDepartement(this.departement);
        ue.deleted = false;
      },
      error: (errors) => {
        console.log(errors);
        ue.deleted = false;
        this.notification.error('Notification', errors.error.message);
      },
    });
  }

  openEditModal(item: EC, semester: Semester) {
    let modal = this.modalService.create({
      nzTitle: 'Modifier les informations',
      nzContent: EcEditComponent,
      nzData: {
        semester: semester,
        ec: this.ecService.clone(item),
      },
      nzClosable: false,
      nzCentered: true,
    });
    modal.afterClose.subscribe((data: EC | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  onDeleteOk(item: EC, semester: Semester) {
    item.deleted = true;
    this.ecService.delete(item).subscribe({
      next: (response) => {
        this.findByDepartement(this.semesterService.departement());
        this.notification.success('Suppression', 'EC supprimé avec succès.');
      },
      error: (errors) => {
        this.notification.error('Suppression', errors.error.message);
      },
    });
  }

  openCreateSemesterModal() {
    let modal = this.modalService.create({
      nzTitle: 'AJOUTER UN NOUVEAU SEMESTRE',
      nzContent: SemesterCreateComponent,
      nzData: {
        departement: this.departement,
      },
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Semester | null) => {
      if (data) {
        this.findByDepartement(this.departement);
      }
    });
  }

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.semesterService.can(
      p,
      this.semesterService.getPermissions()
    );
    return test;
  }
}
