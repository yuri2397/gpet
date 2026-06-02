import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthStore } from '../auth-store';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const toast = inject(ToastService);
  if (auth.isAdmin()) return true;
  toast.error('Notification', 'Vous ne pouvez pas acceder a cette section.');
  return false;
};
