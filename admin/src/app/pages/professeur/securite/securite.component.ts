import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.component.html',
  styleUrls: ['./securite.component.scss']
})
export class SecuriteComponent implements OnInit {

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
    private modalService: NzModalService,
    private userService: UserService,
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
      nzOnOk: () => this.logout(),
      nzCancelText: 'Annuler',
      //nzOkLoading: this.deleteLoad,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered : true
    });
  }

  logout(){
    this.isLoad = true;
    this.authService.logOut().subscribe({
      next:() => {
        this.notification.createNotification(
          'success',
          'Notification',
          'Déconnexion réussie',
        );
      },
      error:(errors : any) => {
        this.isLoad = false;
        if (errors.status != 403)
          this.notification.createNotification(
            'erreur',
            'Notification',
             errors.error.message);
      },
    });
    this.userService.logout();
  }


}
