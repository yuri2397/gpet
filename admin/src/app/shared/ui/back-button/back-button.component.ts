import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button (click)="goBack()" class="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer mb-4">
      <app-icon name="arrow_back" class="text-sm" />
      <span class="text-sm font-medium">Retour</span>
    </button>
  `
})
export class BackButtonComponent {
  private location = inject(Location);
  goBack() { this.location.back(); }
}
