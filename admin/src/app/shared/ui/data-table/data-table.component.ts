import { Component, input, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <!-- Loading overlay -->
      @if (loading()) {
        <div class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-lg">
          <i class="fa-solid fa-spinner fa-spin text-primary text-2xl"></i>
        </div>
      }

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full" [class.border]="bordered()" [class.border-gray-200]="bordered()">
          <ng-content></ng-content>
        </table>
      </div>

      <!-- Pagination -->
      @if (totalPages() > 1 || showSizeChanger()) {
        <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>Afficher</span>
            <select
              [ngModel]="pageSize()"
              (ngModelChange)="onPageSizeChange($event)"
              class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
            >
              @for (size of pageSizeOptions(); track size) {
                <option [value]="size">{{ size }}</option>
              }
            </select>
            <span>par page</span>
          </div>

          <div class="flex items-center gap-1">
            <button
              (click)="goToPage(currentPage() - 1)"
              [disabled]="currentPage() === 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>

            @for (page of visiblePages(); track page) {
              @if (page === -1) {
                <span class="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
              } @else {
                <button
                  (click)="goToPage(page)"
                  class="w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors cursor-pointer"
                  [ngClass]="page === currentPage()
                    ? 'bg-primary text-white border border-primary'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'"
                >
                  {{ page }}
                </button>
              }
            }

            <button
              (click)="goToPage(currentPage() + 1)"
              [disabled]="currentPage() === totalPages()"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class DataTableComponent {
  data = input.required<any[]>();
  loading = input(false);
  pageSizeOptions = input([5, 10, 20, 30]);
  bordered = input(false);
  showSizeChanger = input(true);
  size = input<'small' | 'middle' | 'default'>('middle');

  pageSize = signal(10);
  currentPage = signal(1);

  totalPages = computed(() => Math.max(1, Math.ceil(this.data().length / this.pageSize())));

  pageData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.data().slice(start, start + this.pageSize());
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: number[] = [1];
    if (current > 3) pages.push(-1);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push(-1);
    pages.push(total);
    return pages;
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onPageSizeChange(size: number | string) {
    this.pageSize.set(+size);
    this.currentPage.set(1);
  }
}
