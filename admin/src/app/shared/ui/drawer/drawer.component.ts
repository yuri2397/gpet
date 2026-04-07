import { Component, input, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="fixed inset-0 z-[1000]">
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 transition-opacity"
          (click)="close.emit()"
        ></div>

        <!-- Panel -->
        <div
          class="absolute top-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300"
          [class.translate-x-0]="visible()"
          [style.width]="width()"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 m-0">{{ title() }}</h3>
            <button
              (click)="close.emit()"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 overflow-y-auto" [style.height]="'calc(100% - 65px)'">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
})
export class DrawerComponent {
  title = input<string>('');
  width = input<string>('400px');
  visible = input(false);
  close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }
}
