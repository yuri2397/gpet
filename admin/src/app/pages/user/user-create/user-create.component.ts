import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Departement } from 'src/app/models/departement';
import { RoleService } from './../../../services/role.service';
import { Role } from './../../../models/role';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
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

  private userService = inject(UserService);
  private modalRef = inject(ModalRef);
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);

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
        this.modalRef.destroy(response);
        this.isLoad = false;
      },
      error: (errors) => {
        this.modalRef.destroy(null);
        this.isLoad = false;
      },
    });
  }
}
