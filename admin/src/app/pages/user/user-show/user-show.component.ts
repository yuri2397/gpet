import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { AddPermissionToUserComponent } from './../../roles/add-permission-to-user/add-permission-to-user.component';
import { RoleService } from './../../../services/role.service';
import { Permission } from 'src/app/models/permission';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';

@Component({
  selector: 'app-user-show',
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
  LoadComponent,
  ],
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss'],
})
export class UserShowComponent implements OnInit {
  isLoad = true;
  user!: User;
  currenPermission!: Permission;
  searchValue = '';
  visible = false;
  listOfDisplayData!: Permission[];
  deleteUserLoad: boolean = false;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private location = inject(Location);
  private notification = inject(NzNotificationService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.findSelectedUser(params['id']);
    });
  }

  findSelectedUser(id: any) {
    let user = new User();
    user.id = id;
    this.isLoad = true;
    this.userService.findSelectedUser(user).subscribe({
      next: (response: User) => {
        this.user = response;

        this.listOfDisplayData = this.user.permissions;
        this.userProfilePath();
        this.isLoad = false;
      },
      error: (errors) => {},
    });
  }

  removePermission(permission: Permission) {
    this.currenPermission = permission;
    this.roleService.removePermissionForUser(permission, this.user).subscribe({
      next: (response) => {
        this.user.permissions.splice(
          this.user.permissions.indexOf(permission),
          1
        );
        this.reset();
        this.user.permissions = [...this.user.permissions];
        this.listOfDisplayData = this.user.permissions;
        this.message.success('Permission supprimée avec succès.');
      },
      error: (errors) => {
        this.message.error(errors.error.message);
      },
    });
  }

  openEditUserModal() {
    let modal = this.modal.create({
      nzTitle: 'Modifier les informations',
      nzContent: UserEditComponent,
      nzData: {
        user: this.userService.clone(this.user),
      },
      nzWidth: '50%',
      nzClosable: false,
      nzMaskClosable: false,
    });
    modal.afterClose.subscribe((e: User | null) => {
      if (e) {
        this.findSelectedUser(e.id);
      }
    });
  }

  userProfilePath() {
    if (this.user.avatar == null) {
      this.user.avatar = '/assets/img/avatar.png';
    } else
      this.user.avatar = this.userService.host + 'storage' + this.user.avatar;
  }

  deleteUser() {
    this.deleteUserLoad = true;

    this.userService.delete(this.user).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Utilisateur supprimer avec succès',
          {
            nzDuration: 5000,
          }
        );
        this.location.back();
      },
      error: (errors) => {
        this.notification.error('Notification', errors.error.message, {
          nzDuration: 5000,
        });
        this.deleteUserLoad = false;
      },
    });
  }

  openAddPermissionModal() {
    let m = this.modal.create({
      nzTitle: 'AJOUTER DE NOUVELLES PERMISSIONS',
      nzContent: AddPermissionToUserComponent,
      nzData: {
        user: this.user,
      },
      nzClosable: false,
      nzMaskClosable: false,
      nzWidth: '60%',
    });

    m.afterClose.subscribe((data) => {
      if (data) this.findSelectedUser(this.user.id);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.user.permissions.filter(
      (item: Permission) => {
        return item.name.indexOf(this.searchValue) !== -1;
      }
    );
  }
}
