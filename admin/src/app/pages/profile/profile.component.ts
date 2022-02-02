import { Role } from './../../models/role';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  roles!: Role[];
  validateForm!: FormGroup;
  isLoad = false;


  constructor(
    private authService: AuthService,private fb: FormBuilder, private notification: NotificationService

  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.roles = this.authService.getRoles();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      new_password_conf: [null, Validators.required]
    });
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

  //updateConfirmValidator(): void {
    /** wait for refresh value */
  /*  Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }*/

  updatepassword(){
        this.isLoad = true;
        console.log(this.validateForm.value);

        this.authService.updatePassword(this.validateForm.value.password,this.validateForm.value.new_password).subscribe({
          next: (response: User) => {
            this.notification.createNotification(
              'success','Notification','Modification avec succes'
            );
            this.authService.logOut();
            this.isLoad = false;
          },
          error: (errors:any) => {
            this.isLoad = false;
            this.notification.createNotification(
              'error',
              'Erreur',
              'probleme de modification'
            );
            console.log(errors);


          },
        });
  }

}
