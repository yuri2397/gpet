import { CanDeleteComponent } from './../shared/ui/can-delete/can-delete.component';
import { UserCreateComponent } from './../pages/user/user-create/user-create.component';
import { UserShowComponent } from './../pages/user/user-show/user-show.component';
import { UserListComponent } from './../pages/user/user-list/user-list.component';
import { CourseShowComponent } from './../pages/course/course-show/course-show.component';
import { CourseListComponent } from './../pages/course/course-list/course-list.component';
import { CourseCreateComponent } from './../pages/course/course-create/course-create.component';
import { ClasseCreateComponent } from './../pages/classe/classe-create/classe-create.component';
import { ClasseShowComponent } from './../pages/classe/classe-show/classe-show.component';
import { ClasseListComponent } from './../pages/classe/classe-list/classe-list.component';
import { ErrorServerComponent } from './../shared/ui/error-server/error-server.component';
import { ProfesseurEditComponent } from './../pages/professeur/professeur-edit/professeur-edit.component';
import { ProfesseurCreateComponent } from './../pages/professeur/professeur-create/professeur-create.component';
import { SalleEditComponent } from './../pages/salle/salle-edit/salle-edit.component';
import { DepartementCreateComponent } from './../pages/departement/departement-create/departement-create.component';
import { DepartementEditComponent } from './../pages/departement/departement-edit/departement-edit.component';
import { DepartementListComponent } from './../pages/departement/departement-list/departement-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BatimentShowComponent } from './../pages/batiment/batiment-show/batiment-show.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';

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
import { ProfesseurListComponent } from '../pages/professeur/professeur-list/professeur-list.component';
import { ProfesseurShowComponent } from '../pages/professeur/professeur-show/professeur-show.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import fr from '@angular/common/locales/fr';
import localeFr from '@angular/common/locales/fr';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

registerLocaleData(localeFr, fr);
@NgModule({
  imports: [
    FormsModule,
    AdminRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzCardModule,
    NzToolTipModule,
    MatIconModule,
    CommonModule,
    NzTableModule,
    MatButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzDropDownModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzDividerModule,
    NzImageModule,
    NzPageHeaderModule,
    NzAlertModule,
    NzEmptyModule,
    NzTabsModule,
  ],
  declarations: [
    AdminComponent,
    BatimentEditComponent,
    BatimentListComponent,
    BatimentCreateComponent,
    BatimentShowComponent,
    DashboardComponent,
    DepartementListComponent,
    DepartementEditComponent,
    DepartementCreateComponent,
    SalleListComponent,
    SalleEditComponent,
    SalleCreateComponent,
    ProfesseurShowComponent,
    ProfesseurListComponent,
    ProfesseurCreateComponent,
    ProfesseurEditComponent,
    ErrorServerComponent,
    ClasseListComponent,
    ClasseShowComponent,
    ClasseCreateComponent,
    CourseCreateComponent,
    CourseListComponent,
    CourseShowComponent,
    UserListComponent,
    UserShowComponent,
    UserCreateComponent,
    CanDeleteComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  exports: [AdminComponent],
})
export class AdminModule {}
