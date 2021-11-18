import { UserService } from './../../services/user.service';
import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Departement } from 'src/app/models/departement';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

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
    roles: ['chef de département'],
  },
  {
    path: 'batiments',
    title: 'Batiments',
    icon: 'room_preferences',
    class: '',
    roles: ['chef de département'],
  },
  {
    path: 'salles',
    title: 'Salles',
    icon: 'meeting_room',
    class: '',
    roles: ['chef de département'],
  },
  {
    path: 'professeurs',
    title: 'Professeurs',
    icon: 'groups',
    class: '',
    roles: ['chef de département'],
  },
  {
    path: 'courses',
    title: 'Cours',
    icon: 'ballot',
    class: '',
    roles: ['chef de département'],
  },
  {
    path: 'users',
    title: 'Administrateurs',
    icon: 'manage_accounts',
    class: '',
    roles: ['chef de département'],
  }
];

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss'],
})
export class DepartementComponent implements OnInit {
  departement: Departement = new Departement();
  isLoad = false;
  isCollapsed = false;
  menuItems!: RouteInfo[];
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private departementService: DepartementService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.departement.id = this.departementService.getUser().departement_id;
    this.find(this.departement);
  }

  find(departement: Departement) {
    this.isLoad = true;
    this.departementService.find(departement).subscribe({
      next: (response) => {
        console.log('DEP', response);
        this.departement = response;
        this.isLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isLoad = false;
      },
    });
  }

  selected(item: RouteInfo){
    return this.router.url.indexOf(item.path) !== -1 ? true : false;
  }

  routerLink(item: RouteInfo){
    this.router.navigate(["/departement/" + item.path]);
  }

  logout(){
    this.userService.logout();
  }
}
