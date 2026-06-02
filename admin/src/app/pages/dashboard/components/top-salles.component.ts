import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSalle } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-top-salles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">Salles les plus utilisées</h3>
        <span class="fa-solid fa-door-open text-red-400 text-base"></span>
      </div>
      @if (data().length > 0) {
        <ul class="m-0 p-0 list-none space-y-3">
          @for (s of data(); track s.id) {
            <li>
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{ s.name || ('Salle n° ' + s.number) }}</span>
                <span class="text-xs text-gray-400">{{ s.usage_count }} créneaux</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-red-400 rounded-full" [style.width.%]="percent(s)"></div>
              </div>
            </li>
          }
        </ul>
      } @else {
        <p class="text-sm text-gray-400 text-center py-8 m-0">Aucune donnée</p>
      }
    </div>
  `,
})
export class TopSallesComponent {
  data = input.required<TopSalle[]>();

  private maxUsage = computed(() => Math.max(1, ...this.data().map((s) => s.usage_count)));

  percent(s: TopSalle): number {
    return Math.round((s.usage_count / this.maxUsage()) * 100);
  }
}
