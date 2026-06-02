import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/shared/auth-store';

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
    RouterModule,
    RouterOutlet,
    IconComponent,
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
