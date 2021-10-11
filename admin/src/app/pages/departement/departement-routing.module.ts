import { ProfileComponent } from '../profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from '../setting/setting.component';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { DepartementShowComponent } from './departement-show/departement-show.component';
import { ProfesseurShowComponent } from '../professeur/professeur-show/professeur-show.component';

const routes: Routes = [
  { path: '', component: DepartementShowComponent },
  { path: 'professeurs/show/:id', component: ProfesseurShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartementRoutingModule {}
