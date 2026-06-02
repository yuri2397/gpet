import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/shared.model';
import { ToastService } from '../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toast = inject(ToastService);

  createNotification(
    type: string,
    title: string,
    content: string,
    duration = 3000
  ): void {
    this.toast.show(type as any, title, content, duration);
  }

  private emitChangeSource = new Subject<Notification>();

  notification$ = this.emitChangeSource.asObservable();

  emit(change: Notification) {
    this.emitChangeSource.next(change);
  }
}
