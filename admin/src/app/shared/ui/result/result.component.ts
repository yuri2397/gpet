import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        [ngClass]="iconBgClass()"
      >
        <i [class]="iconClass()" class="text-3xl"></i>
      </div>
      @if (title()) {
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ title() }}</h2>
      }
      @if (subtitle()) {
        <p class="text-gray-500 mb-6 max-w-md">{{ subtitle() }}</p>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class ResultComponent {
  status = input<'success' | 'error' | 'warning' | 'info' | '404' | '403' | '500'>('info');
  title = input<string>('');
  subtitle = input<string>('');

  iconBgClass = computed(() => {
    const map: Record<string, string> = {
      success: 'bg-green-50',
      error: 'bg-red-50',
      warning: 'bg-amber-50',
      info: 'bg-blue-50',
      '404': 'bg-amber-50',
      '403': 'bg-red-50',
      '500': 'bg-red-50',
    };
    return map[this.status()];
  });

  iconClass = computed(() => {
    const map: Record<string, string> = {
      success: 'fa-solid fa-circle-check text-green-500',
      error: 'fa-solid fa-circle-xmark text-red-500',
      warning: 'fa-solid fa-triangle-exclamation text-amber-500',
      info: 'fa-solid fa-circle-info text-blue-500',
      '404': 'fa-solid fa-magnifying-glass text-amber-500',
      '403': 'fa-solid fa-lock text-red-500',
      '500': 'fa-solid fa-server text-red-500',
    };
    return map[this.status()];
  });
}
