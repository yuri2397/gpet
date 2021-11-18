import { Component, Input, OnInit } from '@angular/core';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-classe-show',
  templateUrl: './classe-show.component.html',
  styleUrls: ['./classe-show.component.scss']
})
export class ClasseShowComponent implements OnInit {

  @Input() classe!: Classe;
  @Input() departement!: Departement;

  constructor() { }

  ngOnInit(): void {
  }

}
