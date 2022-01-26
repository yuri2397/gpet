import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddPermissionToUserComponent } from './../../roles/add-permission-to-user/add-permission-to-user.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from './../../../services/role.service';
import { Permission } from 'src/app/models/permission';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-show',
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
  deleteUserLoad: boolean = false;;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private message: NzMessageService,
    private modal: NzModalService,
    private location: Location,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.findSelectedUser(params['id']);
    });
  }

  findSelectedUser(id: any) {
    let user = new User();
    user.id = id;
    this.userService.findSelectedUser(user).subscribe({
      next: (response) => {
        this.user = response;
        this.listOfDisplayData = this.user.permissions;
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

  userProfilePath() {
    if (this.user.avatar == null) {
      return '/assets/img/avatar.png';
    }
    return this.userService.host + this.user.avatar;
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
        console.log(errors);
        this.notification.error(
          'Notification',
          errors.error.message,
          {
            nzDuration: 5000,
          }
        );
        this.deleteUserLoad = false;
      },
    });
  }

  openAddPermissionModal() {
    let m = this.modal.create({
      nzTitle: 'AJOUTER DE NOUVELLES PERMISSIONS',
      nzContent: AddPermissionToUserComponent,
      nzComponentParams: {
        user: this.user,
      },
      nzClosable: false,
      nzMaskClosable: false,
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
    console.log(this.listOfDisplayData);
  }
}
