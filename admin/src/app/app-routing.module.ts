import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminGuard } from './shared/admin.guard';
import { DepartementComponent } from './pages/departement/departement.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { LocalDataGuard } from './shared/local-data.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent,canActivate: [LoginGuard]},
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
    canActivate: [AuthGuard, LocalDataGuard],
  },
  {
    path:"**",
    redirectTo: "login"
  }
  // {
  //   path: 'departement',
  //   component: DepartementComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./pages/departement/departement.module').then(
  //           (m) => m.DepartementModule
  //         ),
  //     },
  //   ],
  //   canActivate: [AuthGuard, LocalDataGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
