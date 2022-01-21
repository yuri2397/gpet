import { Component, Input, OnInit } from '@angular/core';
import { Classe } from 'src/app/models/classe';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent implements OnInit {

  @Input()departement!: Departement;
  classes!: Classe[];
  isLoad = true;
  constructor() { }

  ngOnInit(): void {
    this.classes = this.departement.classes;
    this.isLoad = false;
  }

}
