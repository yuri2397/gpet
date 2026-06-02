import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _nextId = 0;
  toasts = signal<Toast[]>([]);

  show(type: Toast['type'], title: string, message: string, duration = 3000): void {
    const id = this._nextId++;
    const toast: Toast = { id, type, title, message, duration };
    this.toasts.update((list) => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(title: string, message: string, duration = 3000): void {
    this.show('success', title, message, duration);
  }

  error(title: string, message: string, duration = 5000): void {
    this.show('error', title, message, duration);
  }

  info(title: string, message: string, duration = 3000): void {
    this.show('info', title, message, duration);
  }

  warning(title: string, message: string, duration = 4000): void {
    this.show('warning', title, message, duration);
  }

  remove(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
