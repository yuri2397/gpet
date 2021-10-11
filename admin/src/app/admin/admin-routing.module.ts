import { DepartementShowComponent } from './../pages/departement/departement-show/departement-show.component';
import { ClasseShowComponent } from './../pages/classe/classe-show/classe-show.component';
import { CourseListComponent } from './../pages/course/course-list/course-list.component';
import { BatimentListComponent } from './../pages/batiment/batiment-list/batiment-list.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalleListComponent } from '../pages/salle/salle-list/salle-list.component';
import { ProfesseurShowComponent } from '../pages/professeur/professeur-show/professeur-show.component';
import { ProfesseurListComponent } from '../pages/professeur/professeur-list/professeur-list.component';
import { UserListComponent } from '../pages/user/user-list/user-list.component';
import { ClasseListComponent } from '../pages/classe/classe-list/classe-list.component';
import { DepartementListComponent } from '../pages/departement/departement-list/departement-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'batiments', component: BatimentListComponent },
  { path: 'departements', component: DepartementListComponent },
  { path: 'departements/show/:id', component: DepartementShowComponent },
  { path: 'classes/show/:id', component: ClasseShowComponent },
  { path: 'salles', component: SalleListComponent },
  { path: 'professeurs/show/:id', component: ProfesseurShowComponent },
  { path: 'professeurs', component: ProfesseurListComponent },
  { path: 'classes', component: ClasseListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'courses', component: CourseListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
