import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';
import { Location } from '@angular/common';
import { Departement } from 'src/app/models/departement';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-classe-show',
  templateUrl: './classe-show.component.html',
  styleUrls: ['./classe-show.component.scss']
})
export class ClasseShowComponent implements OnInit {

  dataLoad = true;
  errorNetWork = false;
  classe: Classe = new Classe();
  courses!: Course[];
  departement!: Departement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public classeService: ClasseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classe.id = params['id'];
    });

    this.getClasse();
  }

  getClasse(){
    this.classeService.show(this.classe).subscribe({
      next: response => {
        console.log(response);
        this.classe = response;
        this.courses = response.courses;
        this.departement = response.departement;
        this.dataLoad = false;
      },
      error: errors =>{
        console.log(errors);
        this.errorNetWork = true;
        this.dataLoad = false;
      }
    })
  }

  onBack(){
    this.location.back();
  }
}
