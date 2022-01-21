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

  departement: Departement = new Departement();

  constructor(
    private deptService: DepartementService,
    private route: ActivatedRoute,
    private router: Router, private location: Location,

  ) {}

  ngOnInit(): void {
    this.departement = this.currentDepartement();
    this.find(this.departement);
  }

  currentDepartement(): Departement {
    let d = new Departement();
    if (this.router.url.indexOf('admin') !== -1) {
      this.route.params.subscribe((params) => {
        d.id = params['id'];
      });
    } else {
      d.id = this.deptService.getUser().departement_id;
      console.log("IDDDDD", d.id);
    }
    return d;
  }

  showHeader(){
    return this.deptService.isAdmin();
  }

  onBack(){
    this.location.back();
  }

  find(departement: Departement) {
    this.dataLoad = true;
    this.deptService.find(departement).subscribe({
      next: (response) => {
        console.log(response);
        this.departement = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        this.dataLoad = false;
      },
    });
  }

  onCoursesChanged(courses: Course[]){
    this.departement.courses = courses;
  }
}
