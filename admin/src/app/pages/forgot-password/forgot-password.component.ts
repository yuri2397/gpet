import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private router = inject(Router);

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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public forgotPassWord() {
    this.isLoad = true;
    this.authService.forgotPassword(this.validateForm.value.email).subscribe({
      next: (response: any) => {
        this.notification.createNotification(
          'success',
          'Notification',
          'Code de renitialisation envoyer avec succes'
        );
        this.isLoad = false;
        this.router.navigate(['/reset-password']);
      },
      error: (errors: any) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          'Verifier votre email ou la connexion'
        );
      },
    });
  }
}
