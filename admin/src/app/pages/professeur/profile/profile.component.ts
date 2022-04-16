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
  isLoad = false;
  professeur:any;
  dataLoad = true;
  errorServer = false;

  constructor(private userService: UserService,private notification: NotificationService,
    private modalService: NzModalService,private profService: ProfessorService,private location: Location,
    ) {}

  ngOnInit(): void {
    this.profile();
  }

  profile() {
    this.isLoad = true;

    this.userService.currentUser().subscribe({
      next: (response) => {
        this.professeur=response.professor;
        console.log(response.professor);
        console.log(this.professeur);
        console.log("prof bi "+this.professeur.first_name);
        this.isLoad = false;
      },
      error: (errors) => {

      },
    });
  }


  openEditModal() {
    const modal = this.modalService.create({
      nzTitle: 'Modifier les information',
      nzContent: ProfesseurEditComponent,
      nzComponentParams: {
        professor: this.profService.clone(this.professeur),
      },
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '60em',
    });

    modal.afterClose.subscribe((data: Professor | null) => {
      if (data != null) {
        this.professeur = data;
      }
    });
  }

  userProfilePath() {
    if (this.professeur.avatar == null) {
      return '/assets/img/avatar.png';
    }
    return this.profService.host + this.professeur.avatar;
  }
  onBack() {
    this.location.back();
  }
}
