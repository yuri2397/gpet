import { Routes } from '@angular/router';
import { authGuard } from '../../shared/guards/auth.guard';
import { adminGuard } from '../../shared/guards/admin.guard';
import { cdGuard } from '../../shared/guards/cd.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'unauthorized',
    loadComponent: () => import('../../shared/ui/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('../../pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'batiments',
    loadComponent: () => import('../../pages/batiment/batiment-list/batiment-list.component').then(m => m.BatimentListComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'departements',
    loadComponent: () => import('../../pages/departement/departement-list/departement-list.component').then(m => m.DepartementListComponent),
    canActivate: [adminGuard],
  },
  {
    path: 'professeurs/payements/:register_number',
    loadComponent: () => import('../../pages/professeur/payements/payements.component').then(m => m.PayementsComponent),
  },
  {
    path: 'semesters',
    loadComponent: () => import('../../pages/semester/semester-list/semester-list.component').then(m => m.SemesterListComponent),
    canActivate: [cdGuard],
  },
  {
    path: 'professeurs',
    loadComponent: () => import('../../pages/professeur/professeur-list/professeur-list.component').then(m => m.ProfesseurListComponent),
  },
  {
    path: 'classes',
    loadComponent: () => import('../../pages/classe/classe-list/classe-list.component').then(m => m.ClasseListComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('../../pages/user/user-list/user-list.component').then(m => m.UserListComponent),
  },
  {
    path: 'courses',
    loadComponent: () => import('../../pages/course/course-list/course-list.component').then(m => m.CourseListComponent),
  },
  {
    path: 'courses/show/:id',
    loadComponent: () => import('../../pages/course/course-show/course-show.component').then(m => m.CourseShowComponent),
  },
  {
    path: 'banks',
    loadComponent: () => import('../../pages/bank/bank-list/bank-list.component').then(m => m.BankListComponent),
  },
  {
    path: 'departements/show/:id',
    loadComponent: () => import('../../pages/departement/departement-show/departement-show.component').then(m => m.DepartementShowComponent),
  },
  {
    path: 'classes/show/:id',
    loadComponent: () => import('../../pages/classe/classe-show/classe-show.component').then(m => m.ClasseShowComponent),
  },
  {
    path: 'salles',
    loadComponent: () => import('../../pages/salle/salle-list/salle-list.component').then(m => m.SalleListComponent),
  },
  {
    path: 'roles',
    loadComponent: () => import('../../pages/roles/role-list/role-list.component').then(m => m.RoleListComponent),
  },
  {
    path: 'professeurs/show/:id',
    loadComponent: () => import('../../pages/professeur/professeur-show/professeur-show.component').then(m => m.ProfesseurShowComponent),
  },
  {
    path: 'users/show/:id',
    loadComponent: () => import('../../pages/user/user-show/user-show.component').then(m => m.UserShowComponent),
  },
  {
    path: 'courses/show/syllabus/create/:id',
    loadComponent: () => import('../../pages/syllabus/syllabus-create/syllabus-create.component').then(m => m.SyllabusCreateComponent),
  },
  {
    path: 'courses/show/syllabus/edit/:id',
    loadComponent: () => import('../../pages/syllabus/syllabus-edit/syllabus-edit.component').then(m => m.SyllabusEditComponent),
  },
  {
    path: 'courses/show/syllabus/show/:id',
    loadComponent: () => import('../../pages/syllabus/syllabus-show/syllabus-show.component').then(m => m.SyllabusShowComponent),
  },
];
