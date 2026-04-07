import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth-store';

export const cdGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  if (auth.departement() == null) {
    return router.createUrlTree(['/admin/unauthorized']);
  }
  return true;
};
