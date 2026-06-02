import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-batiment-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ],
  templateUrl: './batiment-show.component.html',
  styleUrls: ['./batiment-show.component.scss']
})
export class BatimentShowComponent implements OnInit {

  ngOnInit(): void {
  }
}
