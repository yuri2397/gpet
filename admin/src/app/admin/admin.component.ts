import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
    roles: ['super-admin'],
  },
  {
    path: 'batiments',
    title: 'Batiments',
    icon: 'room_preferences',
    class: '',
    roles: ['super-admin'],
  },
  {
    path: 'departements',
    title: 'Départements',
    icon: 'support',
    class: '',
    roles: ['super-admin'],
  },
  {
    path: 'salles',
    title: 'Salle',
    icon: 'ballot',
    class: '',
    roles: ['super-admin'],
  },
  {
    path: 'professeurs',
    title: 'Professeurs',
    icon: 'groups',
    class: '',
    roles: ['super-admin'],
  },
  {
    path: 'admins',
    title: 'Administrateurs',
    icon: 'manage_accounts',
    class: '',
    roles: ['super-admin'],
  },
  {
    path: 'profile',
    title: 'Profile',
    icon: 'account_circle',
    class: '',
    roles: [],
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  isLoad = true;
  menuItems!: RouteInfo[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.currentUser();
  }

  currentUser() {
    this.isLoad = true;
    this.userService.currentUser().subscribe({
      next: (response: User) => {
        this.isLoad = false;
        this.userService.setUser(response);
        this.userService.setRoles(response.roles);
      },
      error: (errors) => {
        this.isLoad = false;
      },
    });
  }

  selected(item: RouteInfo){
    return "/admin/" + item.path == this.router.url ? true : false;
  }

  routerLink(item: RouteInfo){
    this.router.navigate(["/admin/" + item.path]);
  }
}
