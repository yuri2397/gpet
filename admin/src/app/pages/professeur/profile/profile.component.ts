import { UserService } from 'src/app/services/user.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  professeur!: Professor;
  professor!: Professor;
  dataLoad = true;
  errorServer = false;
  avatarLoad = false;
  modifierleprofe=false;
  validateForm!: FormGroup;
  file: any;
  isLoad: boolean = false;
  constructor(
    private modalService: NzModalService,
    private profService: ProfessorService,
    private location: Location,
    private fb: FormBuilder,
     private notification: NotificationService,

  ) {}

  ngOnInit(): void {
    this.profile();
    this.validateForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.min(9)]],
      status: [null, [Validators.required]],
      account_number: [null, [Validators.required]],
      key: [null, [Validators.required]],
      rip: [null, [Validators.required]],
      bank_id: [null, [Validators.required]],
      last_degree: [null, [Validators.required]],
      job: [null, null],
      cni: [null, [Validators.required]],
      born_in: [null, [Validators.required]],
      born_at: [null, [Validators.required]],
      professor_type_id: [null, [Validators.required]],
      departement_id: [null, [Validators.required]],
    });
  }

  profile() {
    this.dataLoad = true;
    this.profService.profile().subscribe({
      next: (response) => {
        this.professeur = response;
        console.log(response);
        this.dataLoad = false;
        this.errorServer = false;
      },
      error: (errors) => {
        this.errorServer = true;
        this.dataLoad = false;
      },
    });
  }

  userProfilePath() {
    if (this.professeur.avatar == null) {
      return '/assets/img/avatar.png';
    }
    return this.profService.host + 'storage' + this.professeur.avatar;;
  }
  onBack() {
    this.location.back();
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.updateAvatar();
    }
  }

  updateAvatar() {
    this.avatarLoad = true;
    this.profService.updateAvatar(this.file).subscribe({
      next: (response: Professor) => {
        this.professeur.avatar = response.avatar;
      },
      error: (errors: any) => {
        console.log(errors);
      },
    });
  }

   submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }
  openAddProfModal() {
    this.modifierleprofe=true;
    this.professor=this.profService.clone(this.professeur);
    console.log(this.professor);

  }

  onBornAtChange(date: any) {}

  save() {
    this.isLoad = true;
    console.log("magui ci birr");

    this.profService.edit(this.professor).subscribe({
      next: (response) => {
       this.isLoad = false;
        this.notification.createNotification(
          'success',
          'Notification',
          'Professeur modifié avec succés.'
        );
        this.modifierleprofe=false;
        //console.log(response);
        this.professeur=response;

      },
      error: (errors) => {
        this.isLoad = false;
        console.error(errors);

        this.notification.createNotification(
          'error',
          'Erreur',
          errors.error.message
        );

      },
    });
  }

}
