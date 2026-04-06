import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const notification = inject(NzNotificationService);

  if (authService.isAdmin()) {
    return true;
  }
  notification.error('Notification', 'Vous ne pouvez pas acceder à cette section. Vos droits sont limités.');
  return false;
};
