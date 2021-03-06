import { ComptabityComponent } from './../../pages/professeur/comptabity/comptabity.component';
import { CalendarComponent } from './../../pages/professeur/calendar/calendar.component';
import { ProfileComponent } from './../../pages/professeur/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/professeur/dashboard/dashboard.component';
import { ProfessorComponent } from './professor.component';
import { CourseListComponent } from 'src/app/pages/professeur/course/course-list/course-list.component';
import { CourseShowComponent } from 'src/app/pages/professeur/course/course-show/course-show.component';
import { ResourcesComponent } from 'src/app/pages/professeur/resources/resources.component';
import { PointingComponent } from 'src/app/pages/professeur/pointing/pointing.component';
import { SecuriteComponent } from 'src/app/pages/professeur/securite/securite.component';

const routes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch:"full"},
  { path: 'timestable', component: CalendarComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseShowComponent },
  { path: 'reliquat', component: ComptabityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'resources', component:ResourcesComponent},
  { path: 'pointing', component:PointingComponent},
  { path: 'securite', component:SecuriteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
