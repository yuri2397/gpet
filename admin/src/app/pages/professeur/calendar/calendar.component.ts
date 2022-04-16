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
  constructor(
    private userService: UserService,
    private eptService: EptService
  ) { }

  ngOnInit(): void {
    this.days = this.userService.DAYS
  }

  exportPDF(){

  }
}
