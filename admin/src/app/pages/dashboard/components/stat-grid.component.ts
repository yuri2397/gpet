import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';
import { DashboardTotals } from '../dashboard.types';

@Component({
  selector: 'app-dashboard-stat-grid',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <app-stat-card label="Professeurs" [value]="totals().professors" icon="groups" link="/admin/professeurs" color="orange" />
      <app-stat-card label="Classes" [value]="totals().classes" icon="ballot" link="/admin/classes" color="green" />
      <app-stat-card label="Salles" [value]="totals().salles" icon="meeting_room" link="/admin/salles" color="red" />
      <app-stat-card label="Cours" [value]="totals().courses" icon="history_edu" link="/admin/courses" color="blue" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center gap-2 mb-2 text-orange-500">
          <span class="fa-solid fa-user-slash"></span>
          <span class="text-xs font-semibold uppercase tracking-wide">Profs inactifs</span>
        </div>
        <p class="text-2xl font-bold text-gray-800 m-0">{{ totals().professors_inactive }}</p>
        <p class="text-xs text-gray-400 mt-1">sur {{ totals().professors }} au total</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center gap-2 mb-2 text-amber-500">
          <span class="fa-solid fa-triangle-exclamation"></span>
          <span class="text-xs font-semibold uppercase tracking-wide">Cours sans prof</span>
        </div>
        <p class="text-2xl font-bold text-gray-800 m-0">{{ totals().courses_unassigned }}</p>
        <p class="text-xs text-gray-400 mt-1">à assigner</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center gap-2 mb-2 text-rose-500">
          <span class="fa-solid fa-money-bill-wave"></span>
          <span class="text-xs font-semibold uppercase tracking-wide">Paiements en attente</span>
        </div>
        <p class="text-2xl font-bold text-gray-800 m-0">{{ totals().pending_payments_amount | number }} <span class="text-sm font-medium text-gray-500">FCFA</span></p>
        <p class="text-xs text-gray-400 mt-1">{{ totals().pending_payments_count }} entrée(s)</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center gap-2 mb-2 text-indigo-500">
          <span class="fa-solid fa-chart-line"></span>
          <span class="text-xs font-semibold uppercase tracking-wide">Taux occupation salles</span>
        </div>
        <p class="text-2xl font-bold text-gray-800 m-0">{{ (occupancyRate() * 100) | number: '1.0-1' }}%</p>
        <p class="text-xs text-gray-400 mt-1">moyenne hebdomadaire</p>
      </div>
    </div>
  `,
})
export class DashboardStatGridComponent {
  totals = input.required<DashboardTotals>();
  occupancyRate = input<number>(0);
}
