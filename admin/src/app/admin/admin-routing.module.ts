import { AuthGuard } from './../shared/auth.guard';
import { ProfileComponent } from './../pages/profile/profile.component';
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
import { AdminGuard } from '../shared/admin.guard';
import { BankListComponent } from '../pages/bank/bank-list/bank-list.component';
import { CourseShowComponent } from '../pages/course/course-show/course-show.component';
import { PayementsComponent } from '../pages/professeur/payements/payements.component';
import { UeListComponent } from '../pages/ue/ue-list/ue-list.component';
import { SemesterListComponent } from '../pages/semester/semester-list/semester-list.component';
import { CdGuard } from '../shared/cd.guard';
import { UnauthorizedComponent } from '../shared/ui/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batiments',
    component: BatimentListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'departements',
    component: DepartementListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'professeurs/payements/:register_number',
    component: PayementsComponent,
  },
  {
    path: 'semesters',
    component: SemesterListComponent,
    canActivate: [CdGuard],
  },
  { path: 'professeurs', component: ProfesseurListComponent },
  { path: 'classes', component: ClasseListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/show/:id', component: CourseShowComponent },
  { path: 'banks', component: BankListComponent },
  { path: 'departements/show/:id', component: DepartementShowComponent },
  { path: 'classes/show/:id', component: ClasseShowComponent },
  { path: 'salles', component: SalleListComponent },
  { path: 'professeurs/show/:id', component: ProfesseurShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
