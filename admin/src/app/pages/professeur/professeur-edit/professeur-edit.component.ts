import { Component, Input, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-professeur-edit',
  templateUrl: './professeur-edit.component.html',
  styleUrls: ['./professeur-edit.component.scss']
})
export class ProfesseurEditComponent implements OnInit {
  @Input() professeur!: Professor;
  constructor() { }

  ngOnInit(): void {
  }

}
