import { Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-gray-400">
      <app-icon [name]="icon()" class="text-4xl mb-4" />
      <p class="text-sm font-medium">{{ message() }}</p>
    </div>
  `
})
export class EmptyStateComponent {
  icon = input('emoji_objects');
  message = input('Aucune donnee disponible');
}
