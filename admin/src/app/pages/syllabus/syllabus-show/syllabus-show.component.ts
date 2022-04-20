import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SyllabusService } from 'src/app/services/syllabus.service';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course';
import { Syllabus } from 'src/app/models/syllabus';

@Component({
  selector: 'app-syllabus-show',
  templateUrl: './syllabus-show.component.html',
  styleUrls: ['./syllabus-show.component.scss']
})
export class SyllabusShowComponent implements OnInit {

  isLoad: boolean = false;
  syllabus = new Syllabus();
  dataLoad = true;
  errorServer = false;
  @Input() course!: Course;

  constructor(
    private syllabusService: SyllabusService,
    private notification : NzNotificationService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.syllabus.course_id = params['id'];
      this.find(this.syllabus.course_id);
      console.log(this.syllabus)
      });
  }

  onBack() {
    this.location.back();
  }

  find(id: number){
    this.dataLoad = true;
    this.errorServer = false;
    this.syllabusService.findSyllabus(id).subscribe({
      next: (syllabus) => {
        this.syllabus = syllabus;
        this.dataLoad = false;
      },
      error: (errors) => {
        if (errors.status == 0) {
          this.errorServer = true;
        } else {
          this.dataLoad = false;
        }
      },
    });
  }
}



