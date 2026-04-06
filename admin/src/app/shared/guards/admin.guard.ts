import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthStore } from '../auth-store';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const notification = inject(NzNotificationService);
  if (auth.isAdmin()) return true;
  notification.error('Notification', 'Vous ne pouvez pas acceder a cette section.');
  return false;
};
