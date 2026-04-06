import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Permission } from '../models/permission';
import { Departement } from '../models/departement';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly ROLE_SUPER_ADMIN = 'super admin';
  private readonly ROLE_ADMIN = 'admin';
  private readonly ROLE_CD = 'chef de département';
  private readonly ROLE_PROFESSEUR = 'professeur';

  // Reactive state
  readonly user = signal<User | null>(this.loadUser());
  readonly roles = signal<Role[]>(this.loadRoles());
  readonly permissions = signal<Permission[]>(this.loadPermissions());
  readonly token = signal<string | null>(sessionStorage.getItem('token'));

  // Computed
  readonly isLoggedIn = computed(() => this.token() !== null);
  readonly isAdmin = computed(() => this.roles().some(r => r.name === this.ROLE_ADMIN));
  readonly isSuperAdmin = computed(() => this.roles().some(r => r.name === this.ROLE_SUPER_ADMIN));
  readonly isProfesseur = computed(() => this.roles().some(r => r.name === this.ROLE_PROFESSEUR));
  readonly isCD = computed(() => this.roles().some(r => r.name === this.ROLE_CD));
  readonly departement = computed<Departement | null>(() => this.user()?.departement ?? null);
  readonly departementId = computed<number | null>(() => this.user()?.departement?.id ?? null);
  readonly fullName = computed(() => {
    const u = this.user();
    return u ? `${u.first_name} ${u.last_name}` : '';
  });
  readonly imagePath = computed(() => environment.host.slice(0, -1));

  // Actions
  setAuth(user: User, token: string) {
    this.user.set(user);
    this.roles.set(user.roles);
    this.permissions.set(user.permissions);
    this.token.set(token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('roles', JSON.stringify(user.roles));
    sessionStorage.setItem('permissions', JSON.stringify(user.permissions));
  }

  updateUser(user: User) {
    this.user.set(user);
    this.roles.set(user.roles);
    this.permissions.set(user.permissions);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('roles', JSON.stringify(user.roles));
    sessionStorage.setItem('permissions', JSON.stringify(user.permissions));
  }

  clearAuth() {
    this.user.set(null);
    this.roles.set([]);
    this.permissions.set([]);
    this.token.set(null);
    sessionStorage.clear();
  }

  hasPermission(permissionName: string): boolean {
    return this.permissions().some(p => p.name === permissionName);
  }

  hasRole(roleName: string): boolean {
    return this.roles().some(r => r.name === roleName);
  }

  checkLocalData(): boolean {
    return !!(this.token() && this.user() && this.roles().length > 0);
  }

  private loadUser(): User | null {
    try {
      const data = sessionStorage.getItem('user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private loadRoles(): Role[] {
    try {
      const data = sessionStorage.getItem('roles');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private loadPermissions(): Permission[] {
    try {
      const data = sessionStorage.getItem('permissions');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
