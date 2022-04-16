import { UserService } from 'src/app/services/user.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfesseurEditComponent } from '../professeur-edit/professeur-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  professeur!: Professor;
  dataLoad = true;
  errorServer = false;
  avatarLoad = false;
  file: any;
  constructor(
    private modalService: NzModalService,
    private profService: ProfessorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.profile();
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
}
