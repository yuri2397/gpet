import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { Course } from 'src/app/models/course';
import { Departement } from 'src/app/models/departement';
import { Professor } from 'src/app/models/professor';
import { Semester } from 'src/app/models/semester';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() course!: Course[];
  professor = new Professor();
  isLoad = false;
  errorServer = false;
  constructor(
    private notification: NotificationService,
    private professorService :  ProfessorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.professor.id = params['id'];
    });
    this.findCourses();
  }
  findCourses(){
    this.isLoad = true;
    this.professorService.profile().subscribe({
      next: (response) => {
        this.professor = response;
        console.log(response);

        this.isLoad = false;
        this.errorServer = false;
      },
      error: (errors) => {
        this.errorServer = true;
        this.isLoad = false;
      },
    });
  }

}
