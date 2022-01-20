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
  rolesSelected: string[] = [];

  constructor(
    private userService: UserService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      prenoms: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roles: [[], [Validators.required]]
    })
  }

  submitForm() {}

  destroyModal(data: User | null) {
    this.modalRef.destroy(data);
  }

  save() {}
}
