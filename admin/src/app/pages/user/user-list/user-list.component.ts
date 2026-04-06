import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UserCreateComponent } from './../user-create/user-create.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Permission } from 'src/app/models/permission';
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
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-list',
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
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  isLoad = true;
  deleteUserLoad: boolean = false;
  searchValue: any;
  listOfDisplayData!: User[];

  private userService = inject(UserService);
  private modal = inject(NzModalService);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

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
