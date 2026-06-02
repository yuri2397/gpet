import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '../auth-store';

export const professorGuard: CanActivateFn = () => {
  return inject(AuthStore).isProfesseur();
};
