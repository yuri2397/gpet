import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { Notification } from '../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  createNotification(
    type: string,
    title: string,
    content: string,
    duration = 6000
  ): void {
    this.notification.create(type, title, content, {
      nzAnimate: true,
      nzDuration: duration,
    });
  }

  private emitChangeSource = new Subject<Notification>();

  notification$ = this.emitChangeSource.asObservable();

  emit(change: Notification) {
    this.emitChangeSource.next(change);
  }
}
