import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss'],
})
export class InfoUserComponent {}
