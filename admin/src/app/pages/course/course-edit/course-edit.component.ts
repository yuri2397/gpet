import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { EC } from 'src/app/models/ec';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  semesters!: Semester[];
  professors!: Professor[];
  departements!: Departement[];
  classes!: Classe[];
  courses!: Course[];
  services!: Service[];
  ecs!: EC[];
  constructor() { }

  ngOnInit(): void {
  }

}
