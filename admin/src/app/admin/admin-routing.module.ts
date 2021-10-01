import { DepartementListComponent } from './../pages/departement/departement-list/departement-list.component';
import { BatimentListComponent } from './../pages/batiment/batiment-list/batiment-list.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../pages/profile/profile.component';
import { SettingComponent } from '../pages/setting/setting.component';
import { SalleListComponent } from '../pages/salle/salle-list/salle-list.component';
import { ProfesseurShowComponent } from '../pages/professeur/professeur-show/professeur-show.component';
import { ProfesseurListComponent } from '../pages/professeur/professeur-list/professeur-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'batiments', component: BatimentListComponent },
  { path: 'departements', component: DepartementListComponent },
  { path: 'salles', component: SalleListComponent },
  { path: 'professeurs/show/:id', component: ProfesseurShowComponent },
  { path: 'professeurs', component: ProfesseurListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
