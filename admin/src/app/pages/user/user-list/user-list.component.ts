import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserCreateComponent } from './../user-create/user-create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/permission';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  isLoad = true;
  deleteUserLoad: boolean = false;
  searchValue: any;
  listOfDisplayData!: User[];
  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.findUsers();
  }

  findUsers() {
    this.isLoad = true;
    this.userService.findByAuthDepartement().subscribe({
      next: (response) => {
        this.listOfDisplayData = response;
        this.users = response;
        this.isLoad = false;
      },
      error: (errors) => {},
    });
  }

  openCreateModal() {
    let modal = this.modal.create({
      nzTitle: 'Ajouter un utilisateur',
      nzContent: UserCreateComponent,
      nzClosable: false,nzWidth: "50%"
    });

    modal.afterClose.subscribe((data: any) => {
      if (data) this.findUsers();
    });
  }

  deleteUser(user: User) {
    this.deleteUserLoad = true;
    this.userService.delete(user).subscribe({
      next: (response) => {
        this.notification.success(
          'Notification',
          'Utilisateur supprimer avec succès',
          {
            nzDuration: 5000,
          }
        );
        this.findUsers();
      },
      error: (errors) => {
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

  search(): void {
    this.listOfDisplayData = this.users.filter((item: User) => {
      this.searchValue = this.searchValue.toLocaleLowerCase();
      return (
        item.first_name.toLocaleLowerCase().indexOf(this.searchValue) !== -1 ||
        (item.first_name.toLocaleLowerCase() + " " + item.last_name.toLocaleLowerCase()).indexOf(this.searchValue) !== -1 ||
        item.last_name.toLocaleLowerCase().indexOf(this.searchValue) !== -1 ||
        item.email.toLocaleLowerCase().indexOf(this.searchValue) !== -1
      );
    });
  }

  showUser(data: User) {
    this.router.navigate(['/admin/users/show/' + data.id]);
  }

  can(permission: string) {
    let p = new Permission();
    p.name = permission;
    let test = this.userService.can(p, this.userService.getPermissions());
    return test;
  }
}
