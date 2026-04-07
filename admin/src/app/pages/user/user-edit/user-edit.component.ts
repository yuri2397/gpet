import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { RoleService } from './../../../services/role.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';
import { Departement } from 'src/app/models/departement';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-user-edit',
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
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() user!: User;
  validateForm!: FormGroup;
  isLoad = false;
  roles!: Role[];
  rolesSelected: Role[] = [];
  isRolesLoad: boolean = true;
  departements: Departement[] = [];
  disableDep = false;
  selectedRoles: string[] = [];

  private userService = inject(UserService);
  private modalRef = inject(NzModalRef);
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private notification = inject(NzNotificationService);
  readonly nzModalData = inject(NZ_MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.nzModalData?.user) {
      this.user = this.nzModalData.user;
    }
    this.formatRoles();

    this.findRolesList();
    if (!this.userService.isSuperAdmin()) {
      this.user.departement_id = this.userService.departement().id;
      this.disableDep = true;
    } else {
      this.findDepartements();
    }
    this.validateForm = this.fb.group({
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      roles: [null, [Validators.required]],
      departement_id: [[this.user.departement_id], [Validators.required]],
    });
  }

  formatRoles(){
    this.user.roles.forEach( e => {
      this.selectedRoles.push(e.name);
    })
  }

  findDepartements() {
    this.isLoad = true;
    this.userService.findSelectableList(['departements']).subscribe({
      next: (response) => {
        this.departements = response.departements;
        this.isLoad = false;
      },
    });
  }

  findRolesList() {
    this.isRolesLoad = true;
    this.roleService.findNotSuperAdminRole().subscribe({
      next: (response) => {
        this.roles = response;
        this.isRolesLoad = false;
      },
      error: (errors) => {
        this.notification.error("Notification", errors.error.message)
      },
    });
  }

  destroyModal(data: User | null) {
    this.modalRef.destroy(data);
  }

  save() {
    this.isLoad = true;

    this.userService.edit(this.user, this.selectedRoles).subscribe({
      next: (response) => {
        this.notification.success('Notification', 'Les modifications sont enregistrées avec succès.');
        this.modalRef.destroy(response);
        this.isLoad = false;
      },
      error: (errors) => {
        this.notification.error("Message d'erreur", errors.error.message);
        this.modalRef.destroy(null);
        this.isLoad = false;
      },
    });
  }
}
