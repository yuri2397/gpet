import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
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
import { NzNotificationModule } from 'ng-zorro-antd/notification';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permissions: string[];
}

export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'space_dashboard', class: '', permissions: ['*'] },
  { path: 'batiments', title: 'Batiments', icon: 'room_preferences', class: '', permissions: ['voir batiment'] },
  { path: 'departements', title: 'Départements', icon: 'stream', class: '', permissions: ['voir departement'] },
  { path: 'banks', title: 'Banques', icon: 'account_balance', class: '', permissions: ['voir banque'] },
  { path: 'salles', title: 'Salles', icon: 'meeting_room', class: '', permissions: ['voir salle'] },
  { path: 'professeurs', title: 'Professeurs', icon: 'groups', class: '', permissions: ['voir professeur'] },
  { path: 'courses', title: 'Cours', icon: 'history_edu', class: '', permissions: ['voir cour'] },
  { path: 'semesters', title: 'Semestres', icon: 'low_priority', class: '', permissions: ['voir semestre'] },
  { path: 'classes', title: 'Classes', icon: 'ballot', class: '', permissions: ['voir classe'] },
  { path: 'users', title: 'Administrateurs', icon: 'manage_accounts', class: '', permissions: ['voir admin'] },
];

@Component({
  selector: 'app-admin',
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
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authStore = inject(AuthStore);

  isCollapsed = signal(false);
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
        if (!this.authStore.isSuperAdmin()) {
          this.depTitle.set(response.departement.name.toUpperCase());
        }
        this.menuItems.set(ROUTES.filter((menuItem) => menuItem));
        if (response.permissions.length === 0) {
          this.router.navigate(['/any-permission']);
        }
        this.isLoad.set(false);
      },
      error: () => {
        this.isLoad.set(false);
      },
    });
  }

  selected(item: RouteInfo) {
    return this.router.url.indexOf(item.path) !== -1;
  }

  routerLink(item: RouteInfo) {
    this.router.navigate(['/admin/' + item.path]);
  }

  logout() {
    this.authStore.clearAuth();
    this.router.navigate(['/']);
  }

  canShowItem(item: RouteInfo) {
    if (item.path === 'semesters' && this.authStore.isSuperAdmin()) {
      return false;
    }
    const perms = this.permissions();
    return perms.some(e =>
      item.permissions.includes(e.name) || item.permissions.includes('*')
    );
  }

  profile() {
    this.router.navigate(['profile']);
  }
}
