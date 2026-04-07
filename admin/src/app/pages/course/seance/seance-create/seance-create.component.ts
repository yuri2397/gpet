import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'app-seance-create',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IconComponent,
  ],
  templateUrl: './seance-create.component.html',
  styleUrls: ['./seance-create.component.scss']
})
export class SeanceCreateComponent implements OnInit {

  ngOnInit(): void {
  }

}
