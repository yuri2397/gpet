import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorComponent } from './professor.component';
import { ProfileComponent } from '../../pages/professeur/profile/profile.component';
import { CalendarComponent } from '../../pages/professeur/calendar/calendar.component';
import { ComptabityComponent } from '../../pages/professeur/comptabity/comptabity.component';
import { CourseListComponent } from '../../pages/professeur/course/course-list/course-list.component';
import { CourseShowComponent } from '../../pages/professeur/course/course-show/course-show.component';
import { PointingComponent } from '../../pages/professeur/pointing/pointing.component';
import { ResourcesComponent } from '../../pages/professeur/resources/resources.component';
import { SecuriteComponent } from '../../pages/professeur/securite/securite.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfessorComponent,
    ProfileComponent,
    CalendarComponent,
    ComptabityComponent,
    CourseListComponent,
    CourseShowComponent,
    PointingComponent,
    ResourcesComponent,
    SecuriteComponent,
  ],
  imports: [
    ProfessorRoutingModule,
    SharedModule
  ]
})
export class ProfessorModule { }
