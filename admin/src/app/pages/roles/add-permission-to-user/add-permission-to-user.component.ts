import { Permission } from 'src/app/models/permission';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { User } from 'src/app/models/user';
import { Component, Input, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-add-permission-to-user',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './add-permission-to-user.component.html',
  styleUrls: ['./add-permission-to-user.component.scss'],
})
export class AddPermissionToUserComponent implements OnInit, AfterViewInit {
  private roleService = inject(RoleService);
  private fb = inject(FormBuilder);
  private ref = inject(ModalRef);
  readonly modalData = inject(MODAL_DATA, { optional: true });

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
    if (this.modalData?.user) {
      this.user = this.modalData.user;
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
          if (this.roleService.getUser().id === this.user.id) {
            this.roleService.setPermissions(response.permissions);
            window.location.reload();
          }
          this.ref.destroy(response);
        },
        error: (errors) => {
          this.isLoad = false;
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
