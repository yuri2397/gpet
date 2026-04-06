import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/shared/auth-store';
import { Permission } from '../../models/permission';
import { Role } from '../../models/role';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'courses', title: 'Mes cours', icon: 'checklist_rtl' },
  { path: 'profile', title: 'Profile', icon: 'person' },
  { path: 'timestable', title: 'Emploi du Temps', icon: 'event_note' },
  { path: 'reliquat', title: 'Comptabilité', icon: 'credit_score' },
  { path: 'resources', title: 'Ressource', icon: 'description' },
  { path: 'securite', title: 'Securite', icon: 'admin_panel_settings' },
];

@Component({
  selector: 'app-professor',
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
  RouterOutlet,
  ],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authStore = inject(AuthStore);
  private notification = inject(NzNotificationService);

  isCollapsed = signal(true);
  isLoad = signal(true);
  roles = this.authStore.roles;
  user = this.authStore.user;
  menuItems = signal<RouteInfo[]>([]);
  title = 'UFR SET - GPET';
  depTitle = signal('');
  permissions = this.authStore.permissions;

  ngOnInit() {
    this.currentUser();
  }

  currentUser() {
    this.isLoad.set(true);
    this.userService.currentUser().subscribe({
      next: (response: User) => {
        this.authStore.updateUser(response);
        this.menuItems.set(ROUTES.filter((menuItem) => menuItem));
        this.isLoad.set(false);
      },
      error: (errors) => {
        this.notification.error('Notification', errors.error);
        this.isLoad.set(false);
      },
    });
  }

  selected(item: RouteInfo) {
    return this.router.url.indexOf(item.path) !== -1;
  }

  routerLink(item: RouteInfo) {
    this.router.navigate(['/professor/' + item.path]);
  }

  logout() {
    this.authStore.clearAuth();
    this.router.navigate(['/']);
  }
}
