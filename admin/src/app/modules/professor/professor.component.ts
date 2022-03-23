import { Component, OnInit } from '@angular/core';
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
import { ProfUser } from 'src/app/models/prof-user';

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
}

export const ROUTES: RouteInfo[] = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    icon: 'space_dashboard',
  },
  {
    path: 'profile',
    title: 'Profile',
    icon: 'person',
  },
  {
    path: 'courses',
    title: 'Mes cours',
    icon: 'checklist_rtl',
  },
  {
    path: 'timestable',
    title: 'Emploi du Temps',
    icon: 'event_note',
  },
  {
    path: 'reliquat',
    title: 'Comptabilité',
    icon: 'credit_score',
  },
  {
    path: 'pointing',
    title: 'Pointage',
    icon: 'schedule',
  },

  {
    path: 'resources',
    title: 'Ressource',
    icon: 'description',
  },

  {
    path: 'securite',
    title: 'Securite',
    icon: 'admin_panel_settings',
  },

];
@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  isCollapsed = true;
  isLoad = true;
  roles!: Role[];
  user!: User;
  profuser!:ProfUser;
  menuItems!: RouteInfo[];
  title = 'UFR SET - GPET';
  depTitle!: string;
  permissions!: Permission[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {

    this.currentUser()
  }

  currentUser() {
    //this.isLoad = false;
    this.isLoad = true;
    this.userService.currentUser().subscribe({
      next: (response: User) => {
        this.userService.setUser(response);
        this.userService.setRoles(response.roles);
        this.user = response;
        this.roles = response.roles;
        this.permissions = response.permissions;
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        this.userService.getProfesseur(this.user.id).subscribe({
          next: (response: ProfUser) => {
            this.profuser=response;
            console.log(this.profuser);
          },
          error: (errors) => {

          },
        });

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
    this.router.navigate(['/professor/' + item.path]);
  }

  logout() {
    this.userService.logout();
  }

  public profile(){
    this.router.navigate(['profile']);
  }

}
