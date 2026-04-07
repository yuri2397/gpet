import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      @if (label()) {
        <label
          [for]="for()"
          class="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {{ label() }}
          @if (required()) {
            <span class="text-danger ml-0.5">*</span>
          }
        </label>
      }
      <ng-content></ng-content>
      @if (errorTip() && showError()) {
        <p class="mt-1 text-xs text-danger">{{ errorTip() }}</p>
      }
    </div>
  `,
})
export class FormFieldComponent {
  label = input<string>('');
  for = input<string>('');
  required = input(false);
  errorTip = input<string>('');
  showError = input(false);
}
