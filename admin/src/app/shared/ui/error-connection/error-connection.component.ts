import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-error-connection',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './error-connection.component.html',
  styleUrls: ['./error-connection.component.scss'],
})
export class ErrorConnectionComponent {}
