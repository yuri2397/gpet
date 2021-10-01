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
    this.authService.alreadyConnect();
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
    response.user.roles.forEach((r) => {
      role = r.name;
    });
    switch (role) {
      case 'super admin':
        this.router.navigate(['/admin']);
        break;
      case 'editeur':
        this.router.navigate(['/departement']);
        break;
    }
  }
}