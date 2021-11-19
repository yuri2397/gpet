import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClasseListComponent } from './../classe/classe-list/classe-list.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ErrorServerComponent } from './../../shared/ui/error-server/error-server.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MatButtonModule } from '@angular/material/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MatIconModule } from '@angular/material/icon';
import { DepartementRoutingModule } from './departement-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartementComponent } from './departement.component';
import { DepartementShowComponent } from './departement-show/departement-show.component';
import { DepartementCreateComponent } from './departement-create/departement-create.component';
import { DepartementEditComponent } from './departement-edit/departement-edit.component';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { ProfesseurCreateComponent } from '../professeur/professeur-create/professeur-create.component';
import { ProfesseurEditComponent } from '../professeur/professeur-edit/professeur-edit.component';
import { ProfesseurListComponent } from '../professeur/professeur-list/professeur-list.component';
import { ProfesseurShowComponent } from '../professeur/professeur-show/professeur-show.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CourseCreateComponent } from '../course/course-create/course-create.component';
import { CourseEditComponent } from '../course/course-edit/course-edit.component';
import { CourseListComponent } from '../course/course-list/course-list.component';
import { CourseShowComponent } from '../course/course-show/course-show.component';
import { CanDeleteComponent } from 'src/app/shared/ui/can-delete/can-delete.component';
import { DepartementDashboardComponent } from './departement-dashboard/departement-dashboard.component';
import { ClasseCreateComponent } from '../classe/classe-create/classe-create.component';
import { ClasseShowComponent } from '../classe/classe-show/classe-show.component';
import { ClasseEditComponent } from '../classe/classe-edit/classe-edit.component';
import { EcCreateComponent } from '../ec/ec-create/ec-create.component';
import { EcListComponent } from '../ec/ec-list/ec-list.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BankCreateComponent } from '../bank/bank-create/bank-create.component';
import { BankListComponent } from '../bank/bank-list/bank-list.component';
import { BankEditComponent } from '../bank/bank-edit/bank-edit.component';

@NgModule({
  declarations: [
    DepartementComponent,
    DepartementListComponent,
    DepartementEditComponent,
    DepartementCreateComponent,
    DepartementShowComponent,
    ErrorServerComponent,
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
    DepartementDashboardComponent,
    ClasseListComponent,
    ClasseCreateComponent,
    ClasseShowComponent,
    ClasseEditComponent,
    EcCreateComponent,
    EcListComponent,
    BankCreateComponent,
    BankListComponent,
    BankEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartementRoutingModule,
    MatIconModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    IconsProviderModule,
    MatIconModule,
    MatButtonModule,
    NzLayoutModule,
    NzDropDownModule,
    NzSkeletonModule,
    NzDividerModule,
    NzTabsModule,
    NzResultModule,
    NzStatisticModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzModalModule,
    NzCardModule,
    NzCollapseModule,
    NzToolTipModule,
    NzTableModule,
    NzTagModule,
    NzAlertModule,
    NzAvatarModule,
  ],
  exports: [
    DepartementComponent,
    DepartementListComponent,
    DepartementEditComponent,
    DepartementCreateComponent,
    DepartementShowComponent,
    ErrorServerComponent,
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
    ClasseListComponent,
    ClasseCreateComponent,
    ClasseShowComponent,
    ClasseEditComponent,
    EcCreateComponent,
    EcListComponent,
    BankEditComponent,
    BankCreateComponent,
    BankListComponent,
  ],
})
export class DepartementModule {}
