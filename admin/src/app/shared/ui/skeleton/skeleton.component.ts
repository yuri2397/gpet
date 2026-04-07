import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse space-y-3">
      @if (avatar()) {
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      }
      @for (width of lineWidths(); track $index) {
        <div class="h-4 bg-gray-200 rounded" [style.width]="width"></div>
      }
    </div>
  `,
})
export class SkeletonComponent {
  avatar = input(false);
  lines = input(3);

  lineWidths = computed(() => {
    const n = this.lines();
    return Array.from({ length: n }, (_, i) =>
      i === n - 1 ? '45%' : `${75 + (i % 3) * 8}%`
    );
  });
}
