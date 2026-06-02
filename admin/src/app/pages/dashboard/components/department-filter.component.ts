import { Component, EventEmitter, Output, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-dashboard-department-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex items-center gap-3">
      <label class="text-sm font-medium text-gray-600">Département</label>
      <select
        [(ngModel)]="selected"
        (ngModelChange)="onChange($event)"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-w-48"
      >
        <option [ngValue]="'all'">Tous les départements</option>
        @for (d of departements(); track d.id) {
          <option [ngValue]="d.id">{{ d.name }}</option>
        }
      </select>
    </div>
  `,
})
export class DepartmentFilterComponent implements OnInit {
  private service = inject(DepartementService);

  @Output() departementChange = new EventEmitter<number | null>();

  departements = signal<Departement[]>([]);
  selected: number | 'all' = 'all';

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (list) => this.departements.set(list ?? []),
      error: () => this.departements.set([]),
    });
  }

  onChange(value: number | 'all'): void {
    this.departementChange.emit(value === 'all' ? null : value);
  }
}
