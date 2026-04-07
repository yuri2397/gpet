import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthStore } from 'src/app/shared/auth-store';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { DataTableComponent } from 'src/app/shared/ui/data-table/data-table.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  DataTableComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  isLoad = signal(true);
  deleteUserLoad = signal(false);
  searchValue = signal('');
  listOfDisplayData = signal<User[]>([]);

  private userService = inject(UserService);
  private modalService = inject(ModalService);
  private router = inject(Router);
  private authStore = inject(AuthStore);

  ngOnInit(): void {
    this.findUsers();
  }

  findUsers() {
    this.isLoad.set(true);
    this.userService.findByAuthDepartement().subscribe({
      next: (response) => {
        this.listOfDisplayData.set(response);
        this.users = response;
        this.isLoad.set(false);
      },
      error: (errors) => {},
    });
  }

  openCreateModal() {
    let modal = this.modalService.open({
      title: 'Ajouter un utilisateur',
      component: UserCreateComponent,
    });

    modal.afterClose.subscribe((data: any) => {
      if (data) this.findUsers();
    });
  }

  deleteUser(user: User) {
    this.modalService.confirm({
      title: 'Confirmation',
      content: 'Confirmer votre action.',
      okText: 'Confirmer',
      okDanger: true,
      onOk: () => {
        this.deleteUserLoad.set(true);
        this.userService.delete(user).subscribe({
          next: (response) => {
            this.findUsers();
          },
          error: (errors) => {
            this.deleteUserLoad.set(false);
          },
        });
      },
    });
  }

  search(): void {
    const sv = this.searchValue().toLocaleLowerCase();
    this.listOfDisplayData.set(this.users.filter((item: User) => {
      return (
        item.first_name.toLocaleLowerCase().indexOf(sv) !== -1 ||
        (item.first_name.toLocaleLowerCase() + " " + item.last_name.toLocaleLowerCase()).indexOf(sv) !== -1 ||
        item.last_name.toLocaleLowerCase().indexOf(sv) !== -1 ||
        item.email.toLocaleLowerCase().indexOf(sv) !== -1
      );
    }));
  }

  showUser(data: User) {
    this.router.navigate(['/admin/users/show/' + data.id]);
  }

  can(permission: string) {
    return this.authStore.hasPermission(permission);
  }
}
