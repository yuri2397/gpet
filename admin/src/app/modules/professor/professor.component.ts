import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/shared/auth-store';
import { NotificationService } from 'src/app/services/notification.service';

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
    RouterModule,
    RouterOutlet,
    IconComponent,
  ],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authStore = inject(AuthStore);
  private notification = inject(NotificationService);

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
        this.notification.createNotification('error', 'Notification', errors.error);
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
