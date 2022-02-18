import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Permission } from 'src/app/models/permission';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { User } from 'src/app/models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-permission-to-user',
  templateUrl: './add-permission-to-user.component.html',
  styleUrls: ['./add-permission-to-user.component.scss'],
})
export class AddPermissionToUserComponent implements OnInit {
  @Input() user!: User;
  validateForm!: FormGroup;
  permissions!: Permission[];
  selectedValue!: string[];
  isLoad = false;
  isDataLoad = true;
  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private ref: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
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

  // search(data: string) {
  //   data = data.trim();
  //   if (data.length > 5) {
  //     this.isDataLoad = true;
  //     this.roleService.searchPermission(data).subscribe({
  //       next: (response) => {
  //         this.permissions = response;
  //         this.isDataLoad = false;
  //       },
  //     });
  //   }
  // }

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
