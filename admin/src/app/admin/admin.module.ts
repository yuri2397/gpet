import { SalleEditComponent } from './../pages/salle/salle-edit/salle-edit.component';
import { DepartementCreateComponent } from './../pages/departement/departement-create/departement-create.component';
import { DepartementEditComponent } from './../pages/departement/departement-edit/departement-edit.component';
import { DepartementListComponent } from './../pages/departement/departement-list/departement-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BatimentShowComponent } from './../pages/batiment/batiment-show/batiment-show.component';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { AdminRoutingModule } from './admin-routing.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
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
    NzTagModule
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
    SalleCreateComponent
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
