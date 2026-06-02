import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      [ngClass]="colorClasses()"
    >
      <ng-content></ng-content>
    </span>
  `,
  styles: [`:host { display: inline-flex; }`],
})
export class TagComponent {
  color = input<string>('blue');

  colorClasses = computed(() => {
    const map: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-700',
      geekblue: 'bg-blue-50 text-blue-700',
      cyan: 'bg-cyan-50 text-cyan-700',
      green: 'bg-green-50 text-green-700',
      lime: 'bg-lime-50 text-lime-700',
      red: 'bg-red-50 text-red-700',
      volcano: 'bg-orange-50 text-orange-700',
      orange: 'bg-orange-50 text-orange-700',
      warning: 'bg-amber-50 text-amber-700',
      yellow: 'bg-yellow-50 text-yellow-700',
      gold: 'bg-amber-50 text-amber-700',
      purple: 'bg-purple-50 text-purple-700',
      magenta: 'bg-pink-50 text-pink-700',
      default: 'bg-gray-100 text-gray-700',
    };
    return map[this.color()] || map['default'];
  });
}
