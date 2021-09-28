import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: WelcomeComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
