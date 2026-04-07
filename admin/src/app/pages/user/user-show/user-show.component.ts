import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { AddPermissionToUserComponent } from './../../roles/add-permission-to-user/add-permission-to-user.component';
import { RoleService } from './../../../services/role.service';
import { Permission } from 'src/app/models/permission';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-user-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
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
  private modalService = inject(ModalService);
  private location = inject(Location);

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
    this.modalService.confirm({
      title: 'Confirmation',
      content: 'Confirmer votre action.',
      okText: 'Confirmer',
      okDanger: true,
      onOk: () => {
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
          },
          error: (errors) => {
          },
        });
      },
    });
  }

  openEditUserModal() {
    let modal = this.modalService.open({
      title: 'Modifier les informations',
      component: UserEditComponent,
      data: {
        user: this.userService.clone(this.user),
      },
      size: 'lg',
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
    this.modalService.confirm({
      title: 'Confirmation',
      content: 'Confirmer votre action.',
      okText: 'Confirmer',
      okDanger: true,
      onOk: () => {
        this.deleteUserLoad = true;
        this.userService.delete(this.user).subscribe({
          next: (response) => {
            this.location.back();
          },
          error: (errors) => {
            this.deleteUserLoad = false;
          },
        });
      },
    });
  }

  openAddPermissionModal() {
    let m = this.modalService.open({
      title: 'AJOUTER DE NOUVELLES PERMISSIONS',
      component: AddPermissionToUserComponent,
      data: {
        user: this.user,
      },
      size: 'lg',
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
