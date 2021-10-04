import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  createNotification(type: string, title: string, content: string, duration = 3000): void {
    this.notification.create(
      type,
      title,
      content,
      {nzAnimate: true,nzDuration: duration}
    );
  }
}
