import { Component, Input, OnInit } from '@angular/core';
import { CourseHistory } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-history',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.scss'],
})
export class CourseHistoryComponent implements OnInit {
  @Input('professor') professor!: Professor;
  load = false;
  histories!: CourseHistory[];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('INIT COURSE HISTORIQUE');
    this.getHistory();
  }
  getHistory() {
    this.load = true;
    this.courseService.courseHistory(this.professor).subscribe({
      next: (response) => {
        this.histories = response;
        this.load = false;
        console.log(response);
      },
      error: (errors) => {
        this.load = false;

        console.log(errors);
      },
    });
  }
}
