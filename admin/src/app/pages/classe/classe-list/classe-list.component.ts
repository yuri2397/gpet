import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Permission } from 'src/app/models/permission';
import { ClasseService } from 'src/app/services/classe.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ClasseCreateComponent } from '../classe-create/classe-create.component';
import { ClasseEditComponent } from '../classe-edit/classe-edit.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
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

@Component({
  selector: 'app-classe-list',
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
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss'],
})
export class ClasseListComponent implements OnInit {
  @Input() departement!: Departement;
  @Input() setView!: boolean;
  @Input() classes!: Classe[];
  deleteRestoRef!: NzModalRef;
  isLoad = false;
  deleteLoad = false;
  searchValue = '';
  listOfDisplayData!: Classe[];
  visible = false;

  private notification = inject(NotificationService);
  private modalService = inject(NzModalService);
  classeService = inject(ClasseService);

  ngOnInit(): void {
    if (this.classes == null) {
      this.find();
    } else {
      this.listOfDisplayData = this.classes;
    }
  }

  find() {
    if (this.setView) {
      this.findByDepartement();
    } else {
      this.departement = this.classeService.departement();
      this.selectClasses();
    }
  }

  selectClasses() {
    this.isLoad = true;
    this.classeService.selectClasses().subscribe({
      next: (response) => {
        this.listOfDisplayData = response;
        this.classes = response;
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  findByDepartement() {
    this.isLoad = true;
    this.classeService.findByDepartement(this.departement.id).subscribe({
      next: (response) => {
        this.classes = response;
        this.departement.classes = this.classes;
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  openEditModal(classe: Classe) {
    const modal = this.modalService.create({
      nzTitle: 'Modifier les informations de la classe',
      nzContent: ClasseEditComponent,
      nzData: {
        classe: this.classeService.clone(classe),
        departement: this.departement,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.find();
      }
    });
  }

  openCreateModal() {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter une classe',
      nzContent: ClasseCreateComponent,
      nzData: {
        departement: this.departement,
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '400px',
    });

    modal.afterClose.subscribe((data: Classe | null) => {
      if (data != null) {
        this.find();
      }
    });
  }

  openDeleteModal(classe: Classe) {
    this.deleteRestoRef = this.modalService.confirm({
      nzTitle: '<span>Voulez-vous supprimé cette classe?</span>',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteClasse(classe),
      nzCancelText: 'Annuler',
      nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

  deleteClasse(classe: Classe) {
    this.deleteLoad = true;
    this.classeService.delete(classe).subscribe({
      next: (response) => {
        this.deleteRestoRef.destroy();
        this.find();
        this.deleteLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
      },
    });
  }

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.classeService.can(p, this.classeService.getPermissions());
    return test;
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.classes.filter((item: Classe) => {
      this.searchValue = this.searchValue.toLowerCase();
      return (
        item.name.toLowerCase().indexOf(this.searchValue) !== -1
      );
    });
  }
}
