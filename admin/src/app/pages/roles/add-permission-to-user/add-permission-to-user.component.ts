import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Permission } from 'src/app/models/permission';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { User } from 'src/app/models/user';
import { Component, Input, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-permission-to-user',
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
  templateUrl: './add-permission-to-user.component.html',
  styleUrls: ['./add-permission-to-user.component.scss'],
})
export class AddPermissionToUserComponent implements OnInit, AfterViewInit {
  private roleService = inject(RoleService);
  private fb = inject(FormBuilder);
  private ref = inject(NzModalRef);
  private message = inject(NzMessageService);
  readonly nzModalData = inject(NZ_MODAL_DATA, { optional: true });

  @Input() user!: User;
  validateForm!: FormGroup;
  permissions!: Permission[];
  selectedValue: string[] = [];
  isLoad = false;
  isDataLoad = true;

  ngAfterViewInit(): void {
    this.user.permissions.forEach((p) => {
      this.selectedValue.push(p.name);
    });
  }

  ngOnInit(): void {
    if (this.nzModalData?.user) {
      this.user = this.nzModalData.user;
    }

    this.validateForm = this.fb.group({
      permissions: [[], [Validators.required]],
    });
    this.findAllPermissions();
  }

  destroyModal(data: any | null) {
    this.ref.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.roleService
      .givePermissionToUser(this.user, this.selectedValue)
      .subscribe({
        next: (response) => {
          this.message.success('Permissions attribuées avec succès.');
          if (this.roleService.getUser().id === this.user.id) {
            this.roleService.setPermissions(response.permissions);
            window.location.reload();
          }
          this.ref.destroy(response);
        },
        error: (errors) => {
          this.isLoad = false;
          this.message.error(errors.error.message);
          this.ref.destroy(null);
        },
      });
  }

  findAllPermissions() {
    this.isDataLoad = true;
    this.roleService.findSelectableList(['permissions']).subscribe({
      next: (response) => {
        this.permissions = response.permissions;
        this.isDataLoad = false;
      },
    });
  }
}
