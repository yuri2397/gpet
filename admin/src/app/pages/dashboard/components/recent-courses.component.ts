import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecentCourse } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-recent-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-gray-800">Derniers cours créés</h3>
        <a routerLink="/admin/courses" class="text-xs text-blue-500 hover:underline no-underline">Voir tout</a>
      </div>
      @if (data().length > 0) {
        <ul class="divide-y divide-gray-100 m-0 p-0 list-none">
          @for (c of data(); track c.id) {
            <li class="flex items-center gap-3 py-3">
              <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-xs font-bold">
                {{ c.acronym }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 m-0 truncate">{{ c.name }}</p>
                <p class="text-xs text-gray-400 m-0">{{ c.created_at | date: 'dd MMM y' }}</p>
              </div>
              @if (!c.professor_id) {
                <span class="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium">Sans prof</span>
              }
            </li>
          }
        </ul>
      } @else {
        <p class="text-sm text-gray-400 text-center py-8 m-0">Aucun cours récent</p>
      }
    </div>
  `,
})
export class RecentCoursesComponent {
  data = input.required<RecentCourse[]>();
}
