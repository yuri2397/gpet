import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.isLogIn()) {
    return authService.alreadyConnect();
  }
  return true;
};
