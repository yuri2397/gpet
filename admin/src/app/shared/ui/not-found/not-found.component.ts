import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  private router = inject(Router);

  home() {
    this.router.navigate(['/']);
  }
}
