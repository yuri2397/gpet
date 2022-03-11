import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

  constructor(private fb: FormBuilder,private authService: AuthService, private notification: NotificationService,private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public forgotPassWord(){
    this.isLoad = true;
    this.authService.forgotPassword(this.validateForm.value.email).subscribe({
      next: (response: any) => {

        this.notification.createNotification(
          'success','Notification','Code de renitialisation envoyer avec succes'
        );
        this.isLoad = false;
        this.router.navigate(['/reset-password']);
      },
      error: (errors:any) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          'Verifier votre email ou connexion'
        );
      },
    });
  }

}
