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

  event = [
    {
      title:
        "Les clés du leadership d'impact dans l'environnement VICA <i class='lead'>(Volatilite,Incertitude,Complexite,Ambuguite)</i>",
      innerContent: [
        {
          icon: 'event',
          content: '27 Avril 2023 à 10h00',
        },
        {
          icon: 'location_on',
          content: 'UFR Sciences Economiques et Sociales',
        },
        {
          icon: 'account_circle',
          content: 'Dr. Jéhu NDOUMI',
        },
      ],
      date: '27 Avril 2023 à 10h00',
      location: 'UFR Sciences Economiques et Sociales',
      img: '27.jpg',
    },
    {
      title:
        'Seminaire sur le théme: GNSS as main tool in the developpement of AI applications',
      innerContent: [
        {
          icon: 'event',
          content: '28 Avril 2023 à 10h00',
        },
        {
          icon: 'location_on',
          content: 'UFR Sciences Economiques et Sociales',
        },
        {
          icon: 'account_circle',
          content: 'Experts en GNSS de SatNaw In Africa',
        },
      ],
      date: '28 Avril 2023 à 10h00',
      img: '28.jpg',
    },
  ];
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
    this._publicService
      .allDepartementEdt()
      .pipe(
        first(),
        finalize(() => (this.load = false))
      )
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
