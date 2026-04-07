import {
  Component,
  input,
  output,
  signal,
  computed,
  forwardRef,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative" #selectRoot>
      <!-- Trigger -->
      <button
        type="button"
        (click)="toggle()"
        [disabled]="disabled()"
        class="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-primary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed text-left"
        [class.border-primary]="isOpen()"
      >
        <span [class.text-gray-400]="!selectedLabel()">
          {{ selectedLabel() || placeholder() }}
        </span>
        <div class="flex items-center gap-1">
          @if (allowClear() && selectedValue() != null) {
            <i
              class="fa-solid fa-xmark text-gray-400 hover:text-gray-600 text-xs"
              (click)="clear($event)"
            ></i>
          }
          @if (loading()) {
            <i class="fa-solid fa-spinner fa-spin text-gray-400 text-xs"></i>
          } @else {
            <i
              class="fa-solid fa-chevron-down text-gray-400 text-xs transition-transform duration-200"
              [class.rotate-180]="isOpen()"
            ></i>
          }
        </div>
      </button>

      <!-- Dropdown -->
      @if (isOpen()) {
        <div class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          @if (showSearch()) {
            <div class="p-2 border-b border-gray-100">
              <input
                type="text"
                [ngModel]="searchText()"
                (ngModelChange)="onSearch($event)"
                placeholder="Rechercher..."
                class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
                (click)="$event.stopPropagation()"
              />
            </div>
          }
          <div class="overflow-y-auto max-h-48">
            @for (option of filteredOptions(); track option.value) {
              <div
                (click)="selectOption(option)"
                class="px-3 py-2 text-sm cursor-pointer transition-colors"
                [ngClass]="option.value === selectedValue()
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-50'"
              >
                {{ option.label }}
              </div>
            } @empty {
              <div class="px-3 py-4 text-sm text-gray-400 text-center">
                Aucun résultat
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class SelectComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  options = input<SelectOption[]>([]);
  placeholder = input('Sélectionner...');
  showSearch = input(false);
  allowClear = input(false);
  loading = input(false);
  disabled = input(false);
  nzSize = input<'default' | 'large' | 'small'>('default');

  search = output<string>();

  isOpen = signal(false);
  searchText = signal('');
  selectedValue = signal<any>(null);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  selectedLabel = computed(() => {
    const val = this.selectedValue();
    const opt = this.options().find((o) => o.value === val);
    return opt?.label ?? '';
  });

  filteredOptions = computed(() => {
    const text = this.searchText().toLowerCase();
    if (!text) return this.options();
    return this.options().filter((o) => o.label.toLowerCase().includes(text));
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggle() {
    if (!this.disabled()) {
      this.isOpen.update((v) => !v);
    }
  }

  selectOption(option: SelectOption) {
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.isOpen.set(false);
    this.searchText.set('');
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.selectedValue.set(null);
    this.onChange(null);
    this.onTouched();
  }

  onSearch(text: string) {
    this.searchText.set(text);
    this.search.emit(text);
  }

  writeValue(value: any): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // handled by input
  }
}
