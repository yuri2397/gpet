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
  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findUsers();
  }

  findUsers() {
    this.isLoad = true;
    this.userService.findByAuthDepartement().subscribe({
      next: (response) => {
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
      nzClosable: false,
    });

    modal.afterClose.subscribe((data: any) => {
      if (data) this.findUsers();
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
