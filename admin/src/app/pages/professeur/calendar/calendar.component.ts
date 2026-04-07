import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EptRow } from 'src/app/models/ept-row';
import { ProfessorService } from 'src/app/services/professor.service';
import { UserService } from 'src/app/services/user.service';
import { Day } from 'src/app/models/day';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private userService = inject(UserService);
  private profeService = inject(ProfessorService);

  days!: Day[];
  dataLoad = true;
  data!: EptRow[];

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
