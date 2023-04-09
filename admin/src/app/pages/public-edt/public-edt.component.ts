import { Departement } from 'src/app/models/departement';
import { PublicEdtService } from './public-edt.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Day } from 'src/app/models/day';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-public-edt',
  templateUrl: './public-edt.component.html',
  styleUrls: ['./public-edt.component.scss'],
})
export class PublicEdtComponent implements OnInit {
  departements: Departement[] = [];
  currentDepartement?: Departement;
  days!: Day[];
  load = true;
  now = new Date();

  ready: any;

  allDepartementEdt: any[] = [];
  constructor(
    private _router: Router,
    private _publicService: PublicEdtService
  ) {}

  ngOnInit(): void {
    this.days = this._publicService.DAYS;
    this.getClassesEdt();
  }

  getClassesEdt() {
    this.load = true;
    this._publicService.allDepartementEdt()
    .pipe(first(), finalize(() => this.load = false))
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this.allDepartementEdt = response;
      },
    });
  }

  pipeHours(hour: Date) {
    return hour.toString().substring(0, 5);
  }

}
