import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorComponent } from './professor.component';
import { ProfileComponent } from '../../pages/professeur/profile/profile.component';
import { CalendarComponent } from '../../pages/professeur/calendar/calendar.component';
import { ComptabityComponent } from '../../pages/professeur/comptabity/comptabity.component';
import { CourseListComponent } from '../../pages/professeur/course/course-list/course-list.component';
import { CourseShowComponent } from '../../pages/professeur/course/course-show/course-show.component';


@NgModule({
  declarations: [
    ProfessorComponent,
    ProfileComponent,
    CalendarComponent,
    ComptabityComponent,
    CourseListComponent,
    CourseShowComponent,
  ],
  imports: [
    ProfessorRoutingModule,
    SharedModule
  ]
})
export class ProfessorModule { }
