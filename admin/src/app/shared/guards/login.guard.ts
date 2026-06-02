import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth-store';

export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    if (auth.isAdmin()) {
      return router.createUrlTree(['/admin']);
    }
    return router.createUrlTree(['/professor']);
  }
  return true;
};
