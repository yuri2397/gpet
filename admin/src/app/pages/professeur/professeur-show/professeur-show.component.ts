import { ProfessorService } from './../../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professeur-show',
  templateUrl: './professeur-show.component.html',
  styleUrls: ['./professeur-show.component.scss'],
})
export class ProfesseurShowComponent implements OnInit {
  errorServer = false;
  id!: number;
  professeur!: Professor;
  dataLoad = true;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private profService: ProfessorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.find(this.id);
    });
  }

  find(id: number) {
    this.dataLoad = true;
    this.errorServer = false;
    this.profService.find(id).subscribe({
      next: (professeur) => {
        console.log(professeur);
        this.professeur = professeur;
        this.dataLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        if (errors.status == 0) {
          this.errorServer = true;
        } else {
          this.dataLoad = false;
        }
      },
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

  previousMouth(){
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }

  currentMouth(){
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth() , 1);
  }
}
