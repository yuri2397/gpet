import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopProfessor } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-top-professors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">Top professeurs (heures)</h3>
        <span class="fa-solid fa-user-graduate text-orange-400 text-base"></span>
      </div>
      @if (data().length > 0) {
        <ul class="divide-y divide-gray-100 m-0 p-0 list-none">
          @for (p of data(); track p.id) {
            <li class="flex items-center gap-3 py-3">
              <div class="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-sm font-semibold">
                {{ initial(p) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 m-0 truncate">
                  {{ p.first_name }} {{ p.last_name }}
                </p>
                <p class="text-xs text-gray-400 m-0 truncate">
                  {{ p.registration_number }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-800 m-0">{{ p.hours }}h</p>
                <p class="text-xs text-gray-400 m-0">{{ p.amount | number }} FCFA</p>
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
export class TopProfessorsComponent {
  data = input.required<TopProfessor[]>();

  initial(p: TopProfessor): string {
    return ((p.first_name?.[0] ?? '') + (p.last_name?.[0] ?? '')).toUpperCase() || '?';
  }
}
