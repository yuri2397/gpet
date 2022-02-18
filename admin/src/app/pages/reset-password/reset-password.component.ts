import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
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

  constructor( private router: Router,
    private notification: NotificationService,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
   // this.authService.alreadyConnect();
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      code: [null, [Validators.required, Validators.min(6)]],
      password: [null, [Validators.required, Validators.min(6)]],
      new_password: [null, [Validators.required, Validators.min(6)]],
    }, { validators: this.checkPasswords });
  }
  checkPasswords: Validators = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.value.password;
    let confirmPass = group.value.new_password;
    return pass === confirmPass ? null : { notSame: true };
  }

  public resetPassword() {

    this.isLoad = true;
        this.authService.resetPassword(this.validateForm.value.email,this.validateForm.value.code,this.validateForm.value.password).subscribe({
          next: (response: any) => {
            this.notification.createNotification(
              'success','Notification','Modification avec succes'
            );
            this.authService.alreadyConnect();
            this.isLoad = false;
          },
          error: (errors:any) => {
            this.isLoad = false;
            this.notification.createNotification(
              'error',
              'Erreur',
              'probleme de modification'
            );
          },
        });

  }

}
