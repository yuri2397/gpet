import { AddPermissionToUserComponent } from '../../pages/roles/add-permission-to-user/add-permission-to-user.component';
import { RoleCreateComponent } from '../../pages/roles/role-create/role-create.component';
import { RoleListComponent } from '../../pages/roles/role-list/role-list.component';
import { RoleEditComponent } from '../../pages/roles/role-edit/role-edit.component';
import { EcEditComponent } from '../../pages/ec/ec-edit/ec-edit.component';
import { CanDeleteComponent } from '../../shared/ui/can-delete/can-delete.component';
import { UserCreateComponent } from '../../pages/user/user-create/user-create.component';
import { UserShowComponent } from '../../pages/user/user-show/user-show.component';
import { UserListComponent } from '../../pages/user/user-list/user-list.component';
import { SalleEditComponent } from '../../pages/salle/salle-edit/salle-edit.component';
import { BatimentShowComponent } from '../../pages/batiment/batiment-show/batiment-show.component';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { registerLocaleData } from '@angular/common';
import { AdminComponent } from './admin.component';
import { BatimentCreateComponent } from '../../pages/batiment/batiment-create/batiment-create.component';
import { BatimentEditComponent } from '../../pages/batiment/batiment-edit/batiment-edit.component';
import { BatimentListComponent } from '../../pages/batiment/batiment-list/batiment-list.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { SalleListComponent } from '../../pages/salle/salle-list/salle-list.component';
import { SalleCreateComponent } from '../../pages/salle/salle-create/salle-create.component';

import { CourseEditComponent } from '../../pages/course/course-edit/course-edit.component';
import { CourseCreateComponent } from '../../pages/course/course-create/course-create.component';
import { BankCreateComponent } from '../../pages/bank/bank-create/bank-create.component';
import { BankEditComponent } from '../../pages/bank/bank-edit/bank-edit.component';
import { BankListComponent } from '../../pages/bank/bank-list/bank-list.component';
import { ClasseCreateComponent } from '../../pages/classe/classe-create/classe-create.component';
import { ClasseEditComponent } from '../../pages/classe/classe-edit/classe-edit.component';
import { ClasseListComponent } from '../../pages/classe/classe-list/classe-list.component';
import { ClasseShowComponent } from '../../pages/classe/classe-show/classe-show.component';
import { CourseListComponent } from '../../pages/course/course-list/course-list.component';
import { CourseShowComponent } from '../../pages/course/course-show/course-show.component';
import { EcCreateComponent } from '../../pages/ec/ec-create/ec-create.component';
import { EcListComponent } from '../../pages/ec/ec-list/ec-list.component';
import { ProfesseurCreateComponent } from '../../pages/professeur/professeur-create/professeur-create.component';
import { ProfesseurEditComponent } from '../../pages/professeur/professeur-edit/professeur-edit.component';
import { ProfesseurListComponent } from '../../pages/professeur/professeur-list/professeur-list.component';
import { ProfesseurShowComponent } from '../../pages/professeur/professeur-show/professeur-show.component';
import { ErrorServerComponent } from '../../shared/ui/error-server/error-server.component';
import { DepartementCreateComponent } from '../../pages/departement/departement-create/departement-create.component';
import { DepartementEditComponent } from '../../pages/departement/departement-edit/departement-edit.component';
import { DepartementListComponent } from '../../pages/departement/departement-list/departement-list.component';
import { DepartementShowComponent } from '../../pages/departement/departement-show/departement-show.component';
import { PayementsComponent } from '../../pages/professeur/payements/payements.component';
import { UeListComponent } from '../../pages/ue/ue-list/ue-list.component';
import { EptCreateComponent } from '../../pages/classe/ept-create/ept-create.component';
import { NgxEchartsModule } from 'ngx-echarts';

/**
 * TIME AND DATE
 */
import fr from '@angular/common/locales/fr';
import localeFr from '@angular/common/locales/fr';
import { EptEditComponent } from '../../pages/classe/ept-edit/ept-edit.component';
import { SemesterListComponent } from '../../pages/semester/semester-list/semester-list.component';
import { SemesterCreateComponent } from '../../pages/semester/semester-create/semester-create.component';
import { SemesterEditComponent } from '../../pages/semester/semester-edit/semester-edit.component';
import { UnauthorizedComponent } from '../../shared/ui/unauthorized/unauthorized.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { PayementsPrintComponent } from '../../pages/professeur/payements-print/payements-print.component';
import { PayementsPrintAllComponent } from '../../pages/professeur/payements-print-all/payements-print-all.component';
import { UserEditComponent } from '../../pages/user/user-edit/user-edit.component';
import { UeEditComponent } from '../../pages/ue/ue-edit/ue-edit.component';
import { SyllabusCreateComponent } from '../../pages/syllabus/syllabus-create/syllabus-create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { SyllabusShowComponent } from '../../pages/syllabus/syllabus-show/syllabus-show.component';

registerLocaleData(localeFr, fr);
@NgModule({
  imports: [
    AdminRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    AngularEditorModule,
    SharedModule,
  ],
  declarations: [
    AdminComponent,
    BatimentEditComponent,
    BatimentListComponent,
    BatimentCreateComponent,
    BatimentShowComponent,
    DashboardComponent,
    SalleListComponent,
    SalleEditComponent,
    SalleCreateComponent,
    UserListComponent,
    UserCreateComponent,
    ErrorServerComponent,
    UnauthorizedComponent,
    ClasseListComponent,
    ProfesseurShowComponent,
    ProfesseurListComponent,
    ProfesseurCreateComponent,
    ProfesseurEditComponent,
    CourseCreateComponent,
    CourseListComponent,
    CourseShowComponent,
    CourseEditComponent,
    CanDeleteComponent,
    ClasseCreateComponent,
    ClasseShowComponent,
    ClasseEditComponent,
    EcCreateComponent,
    EcListComponent,
    BankCreateComponent,
    DepartementCreateComponent,
    DepartementEditComponent,
    DepartementListComponent,
    DepartementShowComponent,
    BankListComponent,
    BankEditComponent,
    PayementsComponent,
    UeListComponent,
    EptEditComponent,
    EptCreateComponent,
    SemesterListComponent,
    SemesterCreateComponent,
    SemesterEditComponent,
    ProfileComponent,
    EcEditComponent,
    RoleEditComponent,
    RoleListComponent,
    RoleCreateComponent,
    AddPermissionToUserComponent,
    PayementsPrintComponent,
    PayementsPrintAllComponent,
    UserEditComponent,
    UeEditComponent,
    UserShowComponent,
    SyllabusCreateComponent,
    SyllabusShowComponent
  ],

  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  exports: [AdminComponent],
})
export class AdminModule {}
