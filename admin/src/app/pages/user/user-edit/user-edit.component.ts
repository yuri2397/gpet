import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleService } from './../../../services/role.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';
import { Departement } from 'src/app/models/departement';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { ModalRef, MODAL_DATA } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() user!: User;
  validateForm!: FormGroup;
  isLoad = false;
  roles!: Role[];
  rolesSelected: Role[] = [];
  isRolesLoad: boolean = true;
  departements: Departement[] = [];
  disableDep = false;
  selectedRoles: string[] = [];

  private userService = inject(UserService);
  private modalRef = inject(ModalRef);
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  readonly modalData = inject(MODAL_DATA, { optional: true });

  ngOnInit(): void {
    if (this.modalData?.user) {
      this.user = this.modalData.user;
    }
    this.formatRoles();

    this.findRolesList();
    if (!this.userService.isSuperAdmin()) {
      this.user.departement_id = this.userService.departement().id;
      this.disableDep = true;
    } else {
      this.findDepartements();
    }
    this.validateForm = this.fb.group({
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      roles: [null, [Validators.required]],
      departement_id: [[this.user.departement_id], [Validators.required]],
    });
  }

  formatRoles(){
    this.user.roles.forEach( e => {
      this.selectedRoles.push(e.name);
    })
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

    this.userService.edit(this.user, this.selectedRoles).subscribe({
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
