import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-[#1890ff] to-[#096dd9] px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            @if (icon()) {
              <app-icon [name]="icon()!" class="text-white/80 text-lg" />
            }
            <h3 class="text-white font-semibold text-lg m-0">{{ title() }}</h3>
          </div>
          @if (showAction()) {
            <button
              (click)="action.emit()"
              class="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <app-icon name="add" />
            </button>
          }
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `
})
export class PageHeaderComponent {
  title = input.required<string>();
  icon = input<string | null>(null);
  showAction = input(false);
  action = output<void>();
}
