import { Role } from './../../models/role';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  roles!: Role[];
  validateForm!: FormGroup;


  constructor(
    private authService: AuthService,private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.roles = this.authService.getRoles();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      new_password_conf: [null, Validators.required, this.confirmationValidator]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  userProfilePath() {
    if (this.authService.getUser().avatar == null) {
      return '/assets/img/avatar.png';
    }
    return this.authService.host + this.authService.getUser().avatar;
  }


  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

}
