import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminGuard } from './shared/admin.guard';
import { DepartementComponent } from './pages/departement/departement.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
    ],
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'departement',
    component: DepartementComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/departement/departement.module').then(
            (m) => m.DepartementModule
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
