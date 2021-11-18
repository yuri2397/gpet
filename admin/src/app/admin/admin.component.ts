import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from '../models/role';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'space_dashboard',
    class: '',
    roles: ['super admin'],
  },
  {
    path: 'departement',
    title: 'Dashboard',
    icon: 'space_dashboard',
    class: '',
    roles: ['chef de département'],
  },
  {
    path: 'batiments',
    title: 'Batiments',
    icon: 'room_preferences',
    class: '',
    roles: ['super admin'],
  },
  {
    path: 'departements',
    title: 'Départements',
    icon: 'school',
    class: '',
    roles: ['super admin'],
  },
  {
    path: 'salles',
    title: 'Salles',
    icon: 'meeting_room',
    class: '',
    roles: ['super admin', 'chef de département'],
  },
  {
    path: 'professeurs',
    title: 'Professeurs',
    icon: 'groups',
    class: '',
    roles: ['super admin', 'chef de département'],
  },
  {
    path: 'courses',
    title: 'Cours',
    icon: 'ballot',
    class: '',
    roles: ['super admin', 'chef de département'],
  },
  {
    path: 'classes',
    title: 'Classes',
    icon: 'receipt_long',
    class: '',
    roles: ['chef de département',],
  },
  {
    path: 'users',
    title: 'Administrateurs',
    icon: 'manage_accounts',
    class: '',
    roles: ['super admin', 'chef de département'],
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed = true;
  isLoad = true;
  roles!: Role[];
  user!: User;
  menuItems!: RouteInfo[];
  title = "UFR SET - GPET";

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.currentUser();
  }

  currentUser() {
    this.isLoad = true;
    this.userService.currentUser().subscribe({
      next: (response: User) => {
        this.userService.setUser(response);
        this.userService.setRoles(response.roles);
        this.user = response;
        this.roles = response.roles;
        if(this.userService.isEditeur()){
          this.title = "GPET - " + this.user.departement.name.toUpperCase()
        }
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        this.isLoad = false;
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  selected(item: RouteInfo) {
    return this.router.url.indexOf(item.path) !== -1 ? true : false;
  }

  routerLink(item: RouteInfo) {
    this.router.navigate(['/admin/' + item.path]);
  }

  logout() {
    this.userService.logout();
  }

  canShowItem(item: RouteInfo) {
    let r = false;
    this.roles.forEach((e) => {
      if (item.roles.indexOf(e.name) != -1) {
        r = true;
      }
    });
    return r;
  }
}
