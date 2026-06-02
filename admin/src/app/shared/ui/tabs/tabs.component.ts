import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Tab headers -->
      <div
        class="flex border-b border-gray-200"
        [class.gap-0]="type() === 'card'"
      >
        @for (tab of tabs; track tab.title(); let i = $index) {
          <button
            (click)="selectTab(i)"
            class="px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            [ngClass]="tabClass(i)"
          >
            @if (tab.icon()) {
              <i [class]="tab.icon()!" class="mr-2"></i>
            }
            {{ tab.title() }}
          </button>
        }
      </div>

      <!-- Tab content -->
      <div class="py-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabsList!: QueryList<TabComponent>;

  type = input<'default' | 'card'>('default');
  activeIndex = signal(0);

  get tabs(): TabComponent[] {
    return this.tabsList?.toArray() ?? [];
  }

  ngAfterContentInit() {
    this.updateTabs();
  }

  selectTab(index: number) {
    this.activeIndex.set(index);
    this.updateTabs();
  }

  private updateTabs() {
    this.tabs.forEach((tab, i) => {
      tab.active.set(i === this.activeIndex());
    });
  }

  tabClass(index: number): string {
    const isActive = index === this.activeIndex();
    if (this.type() === 'card') {
      return isActive
        ? 'bg-white border border-gray-200 border-b-white rounded-t-lg text-primary -mb-px'
        : 'bg-gray-50 border border-transparent text-gray-500 hover:text-gray-700';
    }
    return isActive
      ? 'text-primary border-b-2 border-primary -mb-px'
      : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent';
  }
}
