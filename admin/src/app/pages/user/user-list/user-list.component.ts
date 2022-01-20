import { UserCreateComponent } from './../user-create/user-create.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

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
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.findUsers();
  }

  findUsers() {
    this.isLoad = true;
    this.userService.findByAuthDepartement().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  openCreateModal() {
    let modal = this.modal.create({
      nzTitle: 'Ajouter un utilisateur',
      nzContent: UserCreateComponent,
      nzClosable: false,
    });
  }

  openEditModal(data: any) {}
}
