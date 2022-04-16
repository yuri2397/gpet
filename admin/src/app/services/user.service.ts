import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';
import { Router } from '@angular/router';
import { Professor } from '../models/professor';
import { ProfUser } from '../models/prof-user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttp {

  protected _baseUrl = 'user';
  constructor(protected hc: HttpClient, private router: Router) {
    super();
    this.http = hc;
  }

  currentUser() {
    return this.http.get<User>(this.endPointWithSlash + 'profile', {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }
  getProfesseur(id:number) {
    return this.http.get<ProfUser>(this.endPointWithSlash + 'showuserwithprof/'+id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  logout() {
    sessionStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  findByAuthDepartement() {
    return this.http.get<User[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  create(user: User) {
    return this.http.post<any>(
      this.endPointWithSlash + 'create',
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        departement_id: user.departement_id,
        roles: user.roles,
      },
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  clone(user: User): User {
    let u = new User();
    u.id = user.id;
    u.first_name = user.first_name;
    u.last_name = user.last_name;
    u.email = user.email;
    u.departement = user.departement;
    u.departement_id = user.departement.id;
    u.roles = user.roles;
    return u;
  }

  findSelectedUser(user: User) {
    return this.http.get<User>(this.endPointWithSlash + 'show/' + user.id, {
      headers: this.authorizationHeaders,
    });
  }

  edit(user: User, roles: string[]) {
    return this.http.put<User>(
      this.endPointWithSlash + 'update/' + user.id,
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        departement_id: user.departement,
        roles: roles
      },
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  delete(user: User) {
    return this.http.delete(this.endPointWithSlash + 'destroy/' + user.id, {
      headers: this.authorizationHeaders,
    });
  }
}
