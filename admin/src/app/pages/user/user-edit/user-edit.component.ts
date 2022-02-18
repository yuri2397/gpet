import { RoleService } from './../../../services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-user-edit',
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

  constructor(
    private userService: UserService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    console.log('EDIT', this.user);
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
        console.log(errors);
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
        this.notification.success('Notification', 'Les modifications sont enregistrées avec succès.');
        this.modalRef.destroy(response);
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        this.notification.error("Message d'erreur", errors.error.message);
        this.modalRef.destroy(null);
        this.isLoad = false;
      },
    });
  }
}
