import { EptRow } from 'src/app/models/ept-row';
import { ProfessorService } from 'src/app/services/professor.service';
import { EptService } from 'src/app/services/ept.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days!: Day[];
  dataLoad = true;
  data!: EptRow[];
  constructor(
    private userService: UserService,
    private profeService: ProfessorService
  ) { }

  ngOnInit(): void {
    this.days = this.userService.DAYS
    this.getData();
  }

  getData(){
    this.dataLoad = true;
    this.profeService.getProfeseurEPT().subscribe({
      next: response => {
        console.log(response);
        this.data = response;
        this.dataLoad= false;
      },
      error: errors => {
        console.log(errors);
        
      }
    })
  }

  pipeHours(hour: Date) {
    return hour.toString().substring(0, 5);
  }

  exportPDF(){

  }
}
