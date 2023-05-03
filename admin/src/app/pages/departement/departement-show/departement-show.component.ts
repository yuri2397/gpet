import { Salle } from './../../../models/salle';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/models/departement';
import { Location } from '@angular/common';
import { DepartementService } from 'src/app/services/departement.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-departement-show',
  templateUrl: './departement-show.component.html',
  styleUrls: ['./departement-show.component.scss'],
})
export class DepartementShowComponent implements OnInit {
  dataLoad = true;
  errorNetWork = false;
  listes!:Salle[];
  departement: Departement = new Departement();
  constructor(
    private deptService: DepartementService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.departement.id = params['id'];
    });
    this.find(this.departement);
  }

  showHeader() {
    return this.deptService.isAdmin();
  }

  onBack() {
    this.location.back();
  }

  find(departement: Departement) {
    this.dataLoad = true;
    this.deptService.find(departement).subscribe({
      next: (response) => {
        this.departement = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        this.dataLoad = false;

      },
    });
  }

  onCoursesChanged(courses: Course[]) {
    this.departement.courses = courses;
  }

  findSalle(){
    

  }
}
