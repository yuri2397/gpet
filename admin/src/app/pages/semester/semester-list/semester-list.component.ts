import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Departement } from 'src/app/models/departement';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.scss']
})
export class SemesterListComponent implements OnInit {
  isLoad = true;

  semesters!: Semester[];

  constructor(
    private notification: NzNotificationService,
    private semesterService: SemesterService,
  ) { }

  ngOnInit(): void {
    this.findByDepartement(this.semesterService.departement());
  }

  findByDepartement(departement: Departement) {
    this.isLoad = true;
    this.semesterService.findByDepartement(departement).subscribe({
      next: response => {
        this.semesters = response;
        this.isLoad = false;
        console.log(response);

      },
      error: errors => {
        this.isLoad  = false;
        console.error(errors);

      }
    })
  }




}
