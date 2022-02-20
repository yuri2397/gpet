import { Role } from './../../models/role';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  roles!: Role[];
  validateForm!: FormGroup;
  isLoad = false;
  file: any;
  avatarLoad = true;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.userProfilePath();
    this.roles = this.authService.getRoles();
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      new_password_conf: [null, Validators.required],
    }, { validators: this.checkPasswords });
  }

  checkPasswords: Validators = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.value.new_password;
    let confirmPass = group.value.new_password_conf;
    return pass === confirmPass ? null : { notSame: true };
  }

  userProfilePath() {
    if (this.authService.getUser().avatar == null) {
      this.user.avatar = '/assets/img/avatar.png';
    } else
      this.user.avatar = this.authService.host + 'storage' + this.user.avatar;
    this.avatarLoad = false;
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updatepassword() {
    this.isLoad = true;
    this.authService
      .updatePassword(
        this.validateForm.value.password,
        this.validateForm.value.new_password
      )
      .subscribe({
        next: (response: User) => {
          this.notification.createNotification(
            'success',
            'Notification',
            'Modification avec succes'
          );
          this.authService.logOut();
          this.isLoad = false;
        },
        error: (errors: any) => {
          this.isLoad = false;
          this.notification.createNotification(
            'error',
            'Erreur',
            errors.error.message
          );
        },
      });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.updateAvatar();
    }
  }

  updateAvatar() {
    this.avatarLoad = true;
    this.authService.updateAvatar(this.file).subscribe({
      next: (response: User) => {
        this.authService.setUser(response);
        this.user = response;
        this.userProfilePath();
        this.notification.createNotification(
          'success',
          'Notification',
          'Modification avec succes'
        );
        this.isLoad = false;
      },
      error: (errors: any) => {
        this.isLoad = false;
        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );
        this.avatarLoad = false;
      },
    });
  }

  openModal() {
     this.modalService.confirm({
      nzTitle: '<span>Confirmez votre deconnexion</span>',
      nzOkText: 'Valider',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.authService.logOut(),
      nzCancelText: 'Annuler',
      //nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
    });
  }

}
