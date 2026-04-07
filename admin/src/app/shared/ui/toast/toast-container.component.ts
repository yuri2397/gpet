import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto min-w-[320px] max-w-[420px] bg-white rounded-lg shadow-lg border overflow-hidden animate-slide-in"
          [ngClass]="borderClass(toast.type)"
        >
          <div class="flex items-start gap-3 p-4">
            <div class="flex-shrink-0 mt-0.5">
              <i [class]="iconClass(toast.type)" class="text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 m-0">{{ toast.title }}</p>
              <p class="text-sm text-gray-600 mt-1 m-0">{{ toast.message }}</p>
            </div>
            <button
              (click)="toastService.remove(toast.id)"
              class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i class="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
  `],
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  borderClass(type: Toast['type']): string {
    const map: Record<string, string> = {
      success: 'border-l-4 border-l-green-500',
      error: 'border-l-4 border-l-red-500',
      info: 'border-l-4 border-l-blue-500',
      warning: 'border-l-4 border-l-amber-500',
    };
    return map[type];
  }

  iconClass(type: Toast['type']): string {
    const map: Record<string, string> = {
      success: 'fa-solid fa-circle-check text-green-500',
      error: 'fa-solid fa-circle-xmark text-red-500',
      info: 'fa-solid fa-circle-info text-blue-500',
      warning: 'fa-solid fa-triangle-exclamation text-amber-500',
    };
    return map[type];
  }
}
