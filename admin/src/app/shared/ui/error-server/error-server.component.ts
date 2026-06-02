import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-error-server',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './error-server.component.html',
  styleUrls: ['./error-server.component.scss'],
})
export class ErrorServerComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }
}
