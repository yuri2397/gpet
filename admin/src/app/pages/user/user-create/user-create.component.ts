import { Departement } from 'src/app/models/departement';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleService } from './../../../services/role.service';
import { Role } from './../../../models/role';
import { User } from 'src/app/models/user';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;
  roles!: Role[];
  user = new User();
  rolesSelected: Role[] = [];
  isRolesLoad: boolean = true;
  departements: Departement[] = [];
  disableDep = false;
  constructor(
    private userService: UserService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.findRolesList();
    if (!this.userService.isSuperAdmin()) {
      this.user.departement_id = this.userService.departement().id;
      this.disableDep = true;
    } else {
      this.findDepartements();
    }
    this.validateForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roles: [[], [Validators.required]],
      departement_id: [[], [Validators.required]],
    });
  }
  

  findDepartements() {
    this.isLoad = true;
    this.userService.findSelectableList(['departements']).subscribe({
      next: (response) => {
        this.departements = response.departements;
        this.isLoad = false;
      },
    });
  }

  findRolesList() {
    this.isRolesLoad = true;
    this.roleService.findNotSuperAdminRole().subscribe({
      next: (response) => {
        this.roles = response;
        this.isRolesLoad = false;
      },
      error: (errors) => {
      },
    });
  }

  destroyModal(data: User | null) {
    this.modalRef.destroy(data);
  }

  save() {
    this.isLoad = true;
    this.userService.create(this.user).subscribe({
      next: (response) => {
        this.notification.success('Notification', response.message);
        this.modalRef.destroy(response);
        this.isLoad = false;
      },
      error: (errors) => {
        this.notification.error("Message d'erreur", errors.error.message);
        this.modalRef.destroy(null);
        this.isLoad = false;
      },
    });
  }
}
