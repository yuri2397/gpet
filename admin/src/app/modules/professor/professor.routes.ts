import { Routes } from '@angular/router';

export const PROFESSOR_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'timestable',
    loadComponent: () => import('../../pages/professeur/calendar/calendar.component').then(m => m.CalendarComponent),
  },
  {
    path: 'courses',
    loadComponent: () => import('../../pages/professeur/course/course-list/course-list.component').then(m => m.CourseListComponent),
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('../../pages/professeur/course/course-show/course-show.component').then(m => m.CourseShowComponent),
  },
  {
    path: 'reliquat',
    loadComponent: () => import('../../pages/professeur/comptabity/comptabity.component').then(m => m.ComptabityComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('../../pages/professeur/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'resources',
    loadComponent: () => import('../../pages/professeur/resources/resources.component').then(m => m.ResourcesComponent),
  },
  {
    path: 'pointing',
    loadComponent: () => import('../../pages/professeur/pointing/pointing.component').then(m => m.PointingComponent),
  },
  {
    path: 'securite',
    loadComponent: () => import('../../pages/professeur/securite/securite.component').then(m => m.SecuriteComponent),
  },
];
