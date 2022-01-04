import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login-response';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoad = false;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  constructor(
    private router: Router,
    private notification: NotificationService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(6)]],
    });
  }

  login() {
    this.isLoad = true;
    this.authService
      .login(this.validateForm.value.email, this.validateForm.value.password)
      .subscribe({
        next: (response: LoginResponse) => {
          this.authService.setToken(response.token);
          this.authService.setUser(response.user);
          this.authService.setRoles(response.user.roles);
          this.authService.setDepartement(response.departement);
          console.log("LOGIN",response);

          this.afterLogin(response);
          this.isLoad = false;
        },
        error: (errors) => {
          this.isLoad = false;
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
        },
      });
  }
  afterLogin(response: LoginResponse) {
    let role!: string;
    role  = response.user.roles[0].name
    console.log(role);

    switch (role) {
      case this.authService.super_admin:
        this.router.navigate(['/admin/dashboard']);
        break;
      case this.authService.editeur:
        this.router.navigate(['/admin/salles']);
        break;
    }
  }
}
