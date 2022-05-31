import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Permission } from '../../models/permission';
import { Role } from '../../models/role';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permissions: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'space_dashboard',
    class: '',
    permissions: ['*'],
  },
  {
    path: 'batiments',
    title: 'Batiments',
    icon: 'room_preferences',
    class: '',
    permissions: ['voir batiment'],
  },
  {
    path: 'departements',
    title: 'Départements',
    icon: 'stream',
    class: '',
    permissions: ['voir departement'],
  },
  {
    path: 'banks',
    title: 'Banques',
    icon: 'account_balance',
    class: '',
    permissions: ['voir banque'],
  },
  {
    path: 'salles',
    title: 'Salles',
    icon: 'meeting_room',
    class: '',
    permissions: ['voir salle'],
  },
  {
    path: 'professeurs',
    title: 'Professeurs',
    icon: 'groups',
    class: '',
    permissions: ['voir professeur'],
  },
  {
    path: 'courses',
    title: 'Cours',
    icon: 'history_edu',
    class: '',
    permissions: ['voir cour'],
  },
  {
    path: 'semesters',
    title: 'Semestres',
    icon: 'low_priority',
    class: '',
    permissions: ['voir semestre'],
  },
  {
    path: 'classes',
    title: 'Classes',
    icon: 'ballot',
    class: '',
    permissions: ['voir classe'],
  },
  {
    path: 'users',
    title: 'Administrateurs',
    icon: 'manage_accounts',
    class: '',
    permissions: ['voir admin'],
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  isCollapsed = false;
  isLoad = true;
  roles!: Role[];
  user!: User;
  menuItems!: RouteInfo[];
  title = 'UFR SET - GPET';
  depTitle!: string;
  permissions!: Permission[];

  constructor(private router: Router, private userService: UserService) {}
  ngAfterViewInit(): void {
    this.isCollapsed = true;
  }

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
        this.permissions = response.permissions;
        if (!this.userService.isSuperAdmin()) {
          this.depTitle = this.user.departement.name.toUpperCase();
        }
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        if (this.user.permissions.length == 0) {
          this.router.navigate(['/any-permission']);
        }
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
    if(item.path == "semesters" && this.userService.isSuperAdmin()){
      return false;
    }
    let r = false;
    this.permissions.forEach((e) => {
      if (item.permissions.indexOf(e.name) != -1 || item.permissions.indexOf('*') != -1) {
        r = true;
      }
    });
    return r;
  }

  public profile(){
    this.router.navigate(['profile']);
  }
}
