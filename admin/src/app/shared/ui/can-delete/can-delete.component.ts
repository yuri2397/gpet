import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-can-delete',
  templateUrl: './can-delete.component.html',
  styleUrls: ['./can-delete.component.scss']
})
export class CanDeleteComponent implements OnInit {
  @Input() message!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
