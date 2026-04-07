import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-seance-list',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit {

  ngOnInit(): void {
  }

}
