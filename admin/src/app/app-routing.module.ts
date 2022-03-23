import { ProfessorComponent } from './modules/professor/professor.component';
import { AnyPermissionComponent } from './shared/ui/any-permission/any-permission.component';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminGuard } from './shared/admin.guard';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { LocalDataGuard } from './shared/local-data.guard';
import { EdtShowComponent } from './pages/edt/edt-show/edt-show.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ErrorConnectionComponent } from './shared/ui/error-connection/error-connection.component';
import { ProfesseurGuard } from './shared/guards/professeur.guard';

const routes: Routes = [
  { path: '', component: LoginComponent,canActivate: [LoginGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'error-connection', component: ErrorConnectionComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
    canActivate: [ LocalDataGuard,AuthGuard,AdminGuard],
  },
  {
    path: 'edt/:departement/:classe', component: EdtShowComponent
  },
  {
    path: "any-permission", component: AnyPermissionComponent
  },
  {
    path: 'professor',
    component: ProfessorComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/professor/professor.module').then((m) => m.ProfessorModule),
      },
    ],
    canActivate: [ LocalDataGuard,AuthGuard,ProfesseurGuard],
  },
  {
    path:"**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
