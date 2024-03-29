import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { LoadComponent } from './ui/table-load/load.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RessourceEditComponent } from 'src/app/pages/course/ressource/ressource-edit/ressource-edit.component';
import { RessourceListComponent } from 'src/app/pages/course/ressource/ressource-list/ressource-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ChapitreCreateComponent } from '../pages/course/chapitre/chapitre-create/chapitre-create.component';
import { ChapitreEditComponent } from '../pages/course/chapitre/chapitre-edit/chapitre-edit.component';
import { ChapitreListComponent } from '../pages/course/chapitre/chapitre-list/chapitre-list.component';
import { SeanceCreateComponent } from '../pages/course/seance/seance-create/seance-create.component';
import { SeanceEditComponent } from '../pages/course/seance/seance-edit/seance-edit.component';
import { SeanceListComponent } from '../pages/course/seance/seance-list/seance-list.component';
import { InfoUserComponent } from './ui/info-user/info-user.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { CourseHistoryComponent } from '../pages/course/course-history/course-history.component';
import { NotificationComponent } from './ui/notification/notification.component';

@NgModule({
  declarations: [
    RessourceListComponent,
    RessourceEditComponent,
    SeanceCreateComponent,
    SeanceListComponent,
    SeanceEditComponent,
    ChapitreCreateComponent,
    ChapitreListComponent,
    LoadComponent,
    ChapitreEditComponent,
    InfoUserComponent,
    CourseHistoryComponent,
    NotificationComponent,

  ],
  imports: [
    CommonModule,
    NzListModule,
    NzMenuModule,
    MatIconModule,
    MatTableModule,
    NzTimelineModule,
    NzCardModule,
    NzToolTipModule,
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
    NgApexchartsModule,
    NzNotificationModule,NzStepsModule
  ],
  exports: [
    /** COMPONENTS */
    RessourceListComponent,
    RessourceEditComponent,
    SeanceCreateComponent,
    SeanceListComponent,
    SeanceEditComponent,
    ChapitreCreateComponent,
    ChapitreListComponent,
    ChapitreEditComponent,
    LoadComponent,
    CourseHistoryComponent,

    /**MODULES */
    CommonModule,
    NzNotificationModule,
    NzTimelineModule,
    NzListModule,
    NzMenuModule,
    MatIconModule,
    MatTableModule,
    NzCardModule,
    NzToolTipModule,
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
    NzStepsModule,
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
    NzTimePickerModule,
    NzSpinModule,
    NzMessageModule,
    NgApexchartsModule,
    MatProgressBarModule,
    NzAutocompleteModule,
    NzUploadModule,
    NzMessageModule
  ],
})
export class SharedModule {}
