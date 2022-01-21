import { DepartementModule } from './../pages/departement/departement.module';
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
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzResultModule } from 'ng-zorro-antd/result';
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
    NzResultModule,
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
    NzPopconfirmModule,
    NzDatePickerModule,
    NzCollapseModule,
    DepartementModule,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  exports: [AdminComponent],
})
export class AdminModule {}
