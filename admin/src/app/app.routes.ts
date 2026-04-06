import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';
import { professorGuard } from './shared/guards/professor.guard';
import { localDataGuard } from './shared/guards/local-data.guard';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'error-connection',
    loadComponent: () => import('./shared/ui/error-connection/error-connection.component').then(m => m.ErrorConnectionComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./modules/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [localDataGuard, authGuard, adminGuard],
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: 'any-permission',
    loadComponent: () => import('./shared/ui/any-permission/any-permission.component').then(m => m.AnyPermissionComponent),
  },
  {
    path: 'info',
    loadComponent: () => import('./shared/ui/info-user/info-user.component').then(m => m.InfoUserComponent),
  },
  {
    path: 'professor',
    loadComponent: () => import('./modules/professor/professor.component').then(m => m.ProfessorComponent),
    canActivate: [localDataGuard, authGuard, professorGuard],
    loadChildren: () => import('./modules/professor/professor.routes').then(m => m.PROFESSOR_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
