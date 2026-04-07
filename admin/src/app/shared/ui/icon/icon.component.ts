import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<i [class]="iconClass()" [ngClass]="class()"></i>`,
  styles: [`:host { display: inline-flex; align-items: center; }`]
})
export class IconComponent {
  name = input.required<string>();
  class = input<string>('');

  iconClass() {
    const mapping: Record<string, string> = {
      // Menu icons
      'space_dashboard': 'fa-solid fa-gauge-high',
      'room_preferences': 'fa-solid fa-building',
      'stream': 'fa-solid fa-sitemap',
      'account_balance': 'fa-solid fa-landmark',
      'meeting_room': 'fa-solid fa-door-open',
      'groups': 'fa-solid fa-users',
      'history_edu': 'fa-solid fa-book-open',
      'low_priority': 'fa-solid fa-calendar-alt',
      'ballot': 'fa-solid fa-graduation-cap',
      'manage_accounts': 'fa-solid fa-user-shield',
      'checklist_rtl': 'fa-solid fa-list-check',
      'person': 'fa-solid fa-user',
      'event_note': 'fa-solid fa-calendar-days',
      'credit_score': 'fa-solid fa-money-bill-wave',
      'description': 'fa-solid fa-file-lines',
      'admin_panel_settings': 'fa-solid fa-shield-halved',
      // Action icons
      'add': 'fa-solid fa-plus',
      'edit': 'fa-solid fa-pen',
      'delete': 'fa-solid fa-trash',
      'arrow_back': 'fa-solid fa-arrow-left',
      'search': 'fa-solid fa-magnifying-glass',
      'print': 'fa-solid fa-print',
      'file_download': 'fa-solid fa-download',
      'logout': 'fa-solid fa-right-from-bracket',
      'check_circle_outline': 'fa-solid fa-circle-check',
      'pending_actions': 'fa-solid fa-clock',
      'alarm': 'fa-solid fa-bell',
      'paid': 'fa-solid fa-coins',
      'school': 'fa-solid fa-school',
      'place': 'fa-solid fa-location-dot',
      'people': 'fa-solid fa-people-group',
      'maps_home_work': 'fa-solid fa-building-columns',
      'auto_stories': 'fa-solid fa-book',
      'emoji_objects': 'fa-solid fa-lightbulb',
    };
    return mapping[this.name()] || 'fa-solid fa-circle';
  }
}
