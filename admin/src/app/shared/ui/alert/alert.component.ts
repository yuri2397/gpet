import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-start gap-3 px-4 py-3 rounded-lg border"
      [ngClass]="alertClasses()"
      role="alert"
    >
      <i [class]="iconClass()" class="mt-0.5"></i>
      <div class="flex-1 text-sm">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AlertComponent {
  type = input<'success' | 'info' | 'warning' | 'error'>('info');

  alertClasses = computed(() => {
    const map: Record<string, string> = {
      success: 'bg-green-50 border-green-200 text-green-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-amber-50 border-amber-200 text-amber-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };
    return map[this.type()];
  });

  iconClass = computed(() => {
    const map: Record<string, string> = {
      success: 'fa-solid fa-circle-check text-green-500',
      info: 'fa-solid fa-circle-info text-blue-500',
      warning: 'fa-solid fa-triangle-exclamation text-amber-500',
      error: 'fa-solid fa-circle-xmark text-red-500',
    };
    return map[this.type()];
  });
}
