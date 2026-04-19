import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODAL_DATA, ModalRef } from '../../services/modal.service';
import { Observable, isObservable, from } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <div class="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
        [ngClass]="data.okDanger ? 'bg-danger/10' : 'bg-warning/10'">
        <i class="text-2xl"
          [ngClass]="data.okDanger ? 'fa-solid fa-trash text-danger' : 'fa-solid fa-triangle-exclamation text-warning'"></i>
      </div>
      @if (data.content) {
        <p class="text-gray-600 mb-6 text-sm">{{ data.content }}</p>
      }
      <div class="flex items-center justify-center gap-3 pt-2">
        <button
          (click)="cancel()"
          [disabled]="loading()"
          class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {{ data.cancelText }}
        </button>
        <button
          (click)="ok()"
          [disabled]="loading()"
          class="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 border-none"
          [ngClass]="data.okDanger ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'"
        >
          @if (loading()) {
            <i class="fa-solid fa-spinner fa-spin mr-2"></i>
          }
          {{ data.okText }}
        </button>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  data = inject(MODAL_DATA);
  private modalRef = inject(ModalRef);
  loading = signal(false);

  cancel() {
    this.modalRef.destroy(false);
  }

  ok() {
    if (this.data.onOk) {
      const result = this.data.onOk();
      if (isObservable(result)) {
        this.loading.set(true);
        (result as Observable<any>).subscribe({
          next: () => {
            this.loading.set(false);
            this.modalRef.destroy(true);
          },
          error: () => {
            this.loading.set(false);
            this.modalRef.destroy(false);
          },
        });
      } else if (result instanceof Promise) {
        this.loading.set(true);
        result
          .then(() => {
            this.loading.set(false);
            this.modalRef.destroy(true);
          })
          .catch(() => {
            this.loading.set(false);
            this.modalRef.destroy(false);
          });
      } else {
        this.modalRef.destroy(true);
      }
    } else {
      this.modalRef.destroy(true);
    }
  }
}
