import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <a [routerLink]="link()" class="no-underline block">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" [ngClass]="bgClass()">
            <app-icon [name]="icon()" [class]="colorClass()" />
          </div>
          <span class="text-sm font-medium text-gray-500">{{ label() }}</span>
        </div>
        <p class="text-3xl font-bold text-gray-800 m-0">{{ value() }}</p>
      </div>
    </a>
  `
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<number | string>();
  icon = input.required<string>();
  link = input.required<string>();
  color = input<'blue' | 'green' | 'orange' | 'red' | 'purple'>('blue');

  bgClass() {
    const map: Record<string, string> = {
      blue: 'bg-blue-50', green: 'bg-green-50', orange: 'bg-orange-50',
      red: 'bg-red-50', purple: 'bg-purple-50'
    };
    return map[this.color()];
  }

  colorClass() {
    const map: Record<string, string> = {
      blue: 'text-blue-500', green: 'text-green-500', orange: 'text-orange-500',
      red: 'text-red-500', purple: 'text-purple-500'
    };
    return map[this.color()];
  }
}
