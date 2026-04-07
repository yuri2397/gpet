import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from 'src/app/models/login-response';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStore } from 'src/app/shared/auth-store';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private notification = inject(NotificationService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);

  validateForm!: FormGroup;
  isLoad = false;
  version: string = '2.0.1';

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  ngOnInit(): void {
    if (this.authStore.isLoggedIn()) {
      if (this.authStore.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/professor']);
      }
      return;
    }
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
    this.authStore.setAuth(response.user, response.token);
    if (this.authStore.isAdmin()) this.router.navigate(['/admin/dashboard']);
    else this.router.navigate(['/professor']);
  }
}
