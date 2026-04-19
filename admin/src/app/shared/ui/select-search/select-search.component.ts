import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-select-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative" #root>
      @if (selected()) {
        <div
          class="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-3 py-2.5"
        >
          <div class="min-w-0 flex-1">
            <div class="text-sm font-medium text-gray-800 truncate">
              {{ selectedLabel() }}
            </div>
            @if (selectedSublabel()) {
              <div class="text-xs text-gray-500 truncate mt-0.5">
                {{ selectedSublabel() }}
              </div>
            }
          </div>
          <button
            type="button"
            (click)="clear()"
            [disabled]="disabled()"
            title="Retirer"
            class="text-gray-400 hover:text-danger cursor-pointer bg-transparent border-none p-0 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      } @else {
        <div class="relative">
          <i
            class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"
          ></i>
          <input
            type="text"
            [placeholder]="placeholder()"
            [disabled]="disabled()"
            [(ngModel)]="query"
            (ngModelChange)="onQueryChange($event)"
            (focus)="onFocus()"
            class="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          @if (loading()) {
            <i
              class="fa-solid fa-spinner fa-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
            ></i>
          }
        </div>

        @if (isOpen() && query.length >= minChars()) {
          <div
            class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            @if (loading()) {
              <div class="px-3 py-4 text-sm text-gray-400 text-center">
                <i class="fa-solid fa-spinner fa-spin mr-2"></i>Recherche...
              </div>
            } @else if (items() && items().length > 0) {
              @for (item of items(); track trackByFn()(item)) {
                <div
                  (click)="select(item)"
                  class="px-3 py-2.5 text-sm cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 hover:bg-primary/5 hover:text-primary"
                >
                  <div class="font-medium text-gray-800">
                    {{ labelFor(item) }}
                  </div>
                  @if (sublabelFor(item)) {
                    <div class="text-xs text-gray-500 mt-0.5">
                      {{ sublabelFor(item) }}
                    </div>
                  }
                </div>
              }
            } @else {
              <div class="px-3 py-4 text-sm text-gray-400 text-center">
                {{ emptyText() }}
              </div>
            }
          </div>
        } @else if (isOpen() && query.length > 0 && query.length < minChars()) {
          <div
            class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-3 text-xs text-gray-400 text-center"
          >
            Tapez au moins {{ minChars() }} caractères...
          </div>
        }
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class SelectSearchComponent<T = any> {
  private elementRef = inject(ElementRef);

  items = input<T[]>([]);
  selected = input<T | null>(null);
  placeholder = input('Rechercher...');
  emptyText = input('Aucun résultat');
  minChars = input(2);
  debounceMs = input(300);
  loading = input(false);
  disabled = input(false);
  displayWith = input<(item: T) => string>((i: any) => String(i ?? ''));
  sublabelWith = input<((item: T) => string) | null>(null);
  trackByFn = input<(item: T) => any>((i: any) => i?.id ?? i);

  search = output<string>();
  selectedChange = output<T | null>();

  isOpen = signal(false);
  query = '';

  selectedLabel = computed(() => {
    const item = this.selected();
    return item == null ? '' : this.displayWith()(item);
  });

  selectedSublabel = computed(() => {
    const item = this.selected();
    const fn = this.sublabelWith();
    return item == null || !fn ? '' : fn(item);
  });

  labelFor(item: T): string {
    return this.displayWith()(item);
  }

  sublabelFor(item: T): string {
    const fn = this.sublabelWith();
    return fn ? fn(item) : '';
  }

  private query$ = new Subject<string>();

  constructor() {
    this.query$
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        if (value.trim().length >= this.minChars()) {
          this.search.emit(value.trim());
        }
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onFocus() {
    this.isOpen.set(true);
  }

  onQueryChange(value: string) {
    this.isOpen.set(true);
    this.query$.next(value ?? '');
  }

  select(item: T) {
    this.selectedChange.emit(item);
    this.isOpen.set(false);
    this.query = '';
  }

  clear() {
    if (this.disabled()) return;
    this.selectedChange.emit(null);
    this.query = '';
  }
}
