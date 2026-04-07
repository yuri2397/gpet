import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (active()) {
      <ng-content></ng-content>
    }
  `,
})
export class TabComponent {
  title = input.required<string>();
  icon = input<string | null>(null);
  active = signal(false);
}
