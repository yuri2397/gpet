import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative pl-6">
      <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
      <ng-content></ng-content>
    </div>
  `,
})
export class TimelineComponent {}

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative pb-6 last:pb-0">
      <div
        class="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white"
        [ngClass]="dotColor()"
      ></div>
      <div class="pl-2">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TimelineItemComponent {
  color = input<string>('blue');

  dotColor() {
    const map: Record<string, string> = {
      blue: 'bg-primary',
      green: 'bg-green-500',
      red: 'bg-red-500',
      gray: 'bg-gray-400',
    };
    return map[this.color()] || 'bg-primary';
  }
}
