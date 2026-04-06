import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const professorGuard: CanActivateFn = () => {
  return inject(AuthService).isProfesseur();
};
