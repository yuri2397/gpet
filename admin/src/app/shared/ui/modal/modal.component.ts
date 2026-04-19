import {
  Component,
  signal,
  output,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  Injector,
  Type,
  effect,
  HostListener,
  HostBinding,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px]" (click)="close.emit()"></div>

    <!-- Modal card -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl transform transition-all duration-200 w-full mx-4"
      [class.scale-95]="!visible()"
      [class.scale-100]="visible()"
      [ngClass]="sizeClass()"
    >
      <!-- Header -->
      @if (title()) {
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900 m-0">{{ title() }}</h3>
          @if (showCloseButton()) {
            <button
              (click)="close.emit()"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer border-none bg-transparent"
            >
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
          }
        </div>
      }

      <!-- Body -->
      <div class="modal-body max-h-[70vh] overflow-y-auto p-6">
        <ng-container #contentContainer></ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
    }
    :host.modal-hidden {
      opacity: 0;
      pointer-events: none;
    }
    :host.modal-visible {
      opacity: 1;
    }
  `],
})
export class ModalComponent implements AfterViewInit {
  private el = inject(ElementRef);

  @ViewChild('contentContainer', { read: ViewContainerRef })
  contentContainer!: ViewContainerRef;

  title = signal('');
  size = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  visible = signal(false);
  showCloseButton = signal(true);
  contentComponent = signal<Type<any> | null>(null);
  contentInjector = signal<Injector | null>(null);

  @HostBinding('class.modal-hidden') get isHidden() { return !this.visible(); }
  @HostBinding('class.modal-visible') get isVisible() { return this.visible(); }

  close = output<void>();

  private viewInitialized = false;

  sizeClass() {
    const sizes: Record<string, string> = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    };
    return sizes[this.size()] || sizes['md'];
  }

  constructor() {
    effect(() => {
      const comp = this.contentComponent();
      const injector = this.contentInjector();
      if (comp && injector && this.viewInitialized) {
        this.renderContent(comp, injector);
      }
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    const comp = this.contentComponent();
    const injector = this.contentInjector();
    if (comp && injector) {
      this.renderContent(comp, injector);
    }
  }

  private renderContent(component: Type<any>, injector: Injector) {
    this.contentContainer.clear();
    this.contentContainer.createComponent(component, { injector });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close.emit();
  }

  animateOut(): Promise<void> {
    this.visible.set(false);
    return new Promise((resolve) => setTimeout(resolve, 200));
  }
}
