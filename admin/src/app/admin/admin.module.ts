import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddPermissionToUserComponent } from './../pages/roles/add-permission-to-user/add-permission-to-user.component';
import { RoleCreateComponent } from './../pages/roles/role-create/role-create.component';
import { RoleListComponent } from './../pages/roles/role-list/role-list.component';
import { RoleEditComponent } from './../pages/roles/role-edit/role-edit.component';
import { EcEditComponent } from './../pages/ec/ec-edit/ec-edit.component';
import { CanDeleteComponent } from './../shared/ui/can-delete/can-delete.component';
import { UserCreateComponent } from './../pages/user/user-create/user-create.component';
import { UserShowComponent } from './../pages/user/user-show/user-show.component';
import { UserListComponent } from './../pages/user/user-list/user-list.component';
import { SalleEditComponent } from './../pages/salle/salle-edit/salle-edit.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BatimentShowComponent } from './../pages/batiment/batiment-show/batiment-show.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { AdminRoutingModule } from './admin-routing.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AdminComponent } from './admin.component';
import { BatimentCreateComponent } from '../pages/batiment/batiment-create/batiment-create.component';
import { BatimentEditComponent } from '../pages/batiment/batiment-edit/batiment-edit.component';
import { BatimentListComponent } from '../pages/batiment/batiment-list/batiment-list.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MatButtonModule } from '@angular/material/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SalleListComponent } from '../pages/salle/salle-list/salle-list.component';
import { SalleCreateComponent } from '../pages/salle/salle-create/salle-create.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CourseEditComponent } from '../pages/course/course-edit/course-edit.component';
import { CourseCreateComponent } from '../pages/course/course-create/course-create.component';
import { BankCreateComponent } from '../pages/bank/bank-create/bank-create.component';
import { BankEditComponent } from '../pages/bank/bank-edit/bank-edit.component';
import { BankListComponent } from '../pages/bank/bank-list/bank-list.component';
import { ClasseCreateComponent } from '../pages/classe/classe-create/classe-create.component';
import { ClasseEditComponent } from '../pages/classe/classe-edit/classe-edit.component';
import { ClasseListComponent } from '../pages/classe/classe-list/classe-list.component';
import { ClasseShowComponent } from '../pages/classe/classe-show/classe-show.component';
import { CourseListComponent } from '../pages/course/course-list/course-list.component';
import { CourseShowComponent } from '../pages/course/course-show/course-show.component';
import { EcCreateComponent } from '../pages/ec/ec-create/ec-create.component';
import { EcListComponent } from '../pages/ec/ec-list/ec-list.component';
import { ProfesseurCreateComponent } from '../pages/professeur/professeur-create/professeur-create.component';
import { ProfesseurEditComponent } from '../pages/professeur/professeur-edit/professeur-edit.component';
import { ProfesseurListComponent } from '../pages/professeur/professeur-list/professeur-list.component';
import { ProfesseurShowComponent } from '../pages/professeur/professeur-show/professeur-show.component';
import { ErrorServerComponent } from '../shared/ui/error-server/error-server.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { DepartementCreateComponent } from '../pages/departement/departement-create/departement-create.component';
import { DepartementEditComponent } from '../pages/departement/departement-edit/departement-edit.component';
import { DepartementListComponent } from '../pages/departement/departement-list/departement-list.component';
import { DepartementShowComponent } from '../pages/departement/departement-show/departement-show.component';
import { MatTableModule } from '@angular/material/table';
import { PayementsComponent } from '../pages/professeur/payements/payements.component';
import { UeListComponent } from '../pages/ue/ue-list/ue-list.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EptCreateComponent } from '../pages/classe/ept-create/ept-create.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgApexchartsModule } from "ng-apexcharts";

/**
 * TIME AND DATE
 */
import fr from '@angular/common/locales/fr';
import localeFr from '@angular/common/locales/fr';
import { EptEditComponent } from '../pages/classe/ept-edit/ept-edit.component';
import { SemesterListComponent } from '../pages/semester/semester-list/semester-list.component';
import { SemesterCreateComponent } from '../pages/semester/semester-create/semester-create.component';
import { SemesterEditComponent } from '../pages/semester/semester-edit/semester-edit.component';
import { UnauthorizedComponent } from '../shared/ui/unauthorized/unauthorized.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { PayementsPrintComponent } from '../pages/professeur/payements-print/payements-print.component';
import { PayementsPrintAllComponent } from '../pages/professeur/payements-print-all/payements-print-all.component';
import { UserEditComponent } from '../pages/user/user-edit/user-edit.component';
registerLocaleData(localeFr, fr);
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzListModule,
    NzMenuModule,
    MatIconModule,
    MatTableModule,
    NzCardModule,
    NzToolTipModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    NzResultModule,
    MatButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzImageModule,
    NzAlertModule,
    NzEmptyModule,
    NzPageHeaderModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzCollapseModule,
    NzDrawerModule,
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    MatButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzDividerModule,
    NzTabsModule,
    NzResultModule,
    NzIconModule,
    NzStatisticModule,
    NzSelectModule,
    NzModalModule,
    NzCollapseModule,
    NzToolTipModule,
    NzTableModule,
    NzTagModule,
    NzAlertModule,
    NzAvatarModule,
    NzSpaceModule,
    DragDropModule,
    MatCardModule,
    MatProgressBarModule,
    NzTimePickerModule,
    NzSpinModule,
    NzMessageModule,
    NgApexchartsModule
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
    UserShowComponent,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  exports: [AdminComponent],
})
export class AdminModule {}
