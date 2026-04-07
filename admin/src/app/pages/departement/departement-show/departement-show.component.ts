import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Salle } from 'src/app/models/salle';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { Course } from 'src/app/models/course';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { LoadComponent } from 'src/app/shared/ui/table-load/load.component';
import { ErrorServerComponent } from 'src/app/shared/ui/error-server/error-server.component';
import { CourseListComponent } from 'src/app/pages/course/course-list/course-list.component';
import { ClasseListComponent } from 'src/app/pages/classe/classe-list/classe-list.component';
import { ProfesseurListComponent } from 'src/app/pages/professeur/professeur-list/professeur-list.component';
import { SemesterListComponent } from 'src/app/pages/semester/semester-list/semester-list.component';

@Component({
  selector: 'app-departement-show',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzIconModule,
  NzSpinModule,
  NzTagModule,
  NzDropDownModule,
  NzDividerModule,
  NzToolTipModule,
  NzAlertModule,
  NzPopconfirmModule,
  NzDrawerModule,
  NzCardModule,
  NzAvatarModule,
  NzEmptyModule,
  NzPageHeaderModule,
  NzResultModule,
  NzSkeletonModule,
  NzTabsModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzListModule,
  NzSpaceModule,
  NzStatisticModule,
  NzTimelineModule,
  NzImageModule,
  NzAutocompleteModule,
  NzUploadModule,
  NzStepsModule,
  NzMessageModule,
  NzNotificationModule,
  IconComponent,
  LoadComponent,
  ErrorServerComponent,
  CourseListComponent,
  ClasseListComponent,
  ProfesseurListComponent,
  SemesterListComponent,
  ],
  templateUrl: './departement-show.component.html',
  styleUrls: ['./departement-show.component.scss'],
})
export class DepartementShowComponent implements OnInit {
  private deptService = inject(DepartementService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  dataLoad = true;
  errorNetWork = false;
  listes!: Salle[];
  departement: Departement = new Departement();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.departement.id = params['id'];
    });
    this.find(this.departement);
  }

  showHeader() {
    return this.deptService.isAdmin();
  }

  onBack() {
    this.location.back();
  }

  find(departement: Departement) {
    this.dataLoad = true;
    this.deptService.find(departement).subscribe({
      next: (response) => {
        this.departement = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        this.dataLoad = false;
      },
    });
  }

  onCoursesChanged(courses: Course[]) {
    this.departement.courses = courses;
  }
}
