import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collapse-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border border-gray-200 rounded-lg overflow-hidden mb-2">
      <button
        (click)="toggle()"
        class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-left"
      >
        <span class="text-sm font-medium text-gray-700">{{ title() }}</span>
        <i
          class="fa-solid fa-chevron-down text-gray-400 text-xs transition-transform duration-200"
          [class.rotate-180]="isOpen()"
        ></i>
      </button>
      @if (isOpen()) {
        <div class="px-4 py-3 border-t border-gray-200">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
})
export class CollapsePanelComponent {
  title = input.required<string>();
  expanded = input(false);
  isOpen = signal(false);

  ngOnInit() {
    this.isOpen.set(this.expanded());
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
