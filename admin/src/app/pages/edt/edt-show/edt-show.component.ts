import { EptService } from 'src/app/services/ept.service';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';
import { Component, OnInit } from '@angular/core';
import { EptRow } from 'src/app/models/ept-row';
import { ActivatedRoute } from '@angular/router';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-edt-show',
  templateUrl: './edt-show.component.html',
  styleUrls: ['./edt-show.component.scss'],
})
export class EdtShowComponent implements OnInit {
  epts!: EptRow[];
  isLoad = true;
  departement!: Departement;
  classe!: Classe;
  token!: string;
  now = new Date();
  days!: Day[];
  hasError: boolean = false;

  constructor(private route: ActivatedRoute, private edtService: EptService) {}

  ngOnInit(): void {
    this.days = this.edtService.DAYS;
    this.route.params.subscribe((params) => {
      this.departement = params['departement'];
      this.classe = params['classe'];
      this.token = params['token'];
      console.log(this.departement, this.classe, this.token);
      this.getEDT();
    });
  }
  
  exportPDF(){}

  getEDT() {
    this.isLoad = true;
    this.hasError = false;
    this.edtService
      .getEDT(this.departement, this.classe)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.epts = response;
          this.isLoad = false;
        },
        error: (errors) => {
          console.log(errors);
          this.hasError = true;
          this.isLoad = false;
        },
      });
  }
  pipeHours(hour: Date) {
    return hour.toString().substring(0, 5);
  }
}
