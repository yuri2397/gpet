import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';
import { Router } from '@angular/router';

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

  findSelectedUser(user: User) {
    return this.http.get<User>(this.endPointWithSlash + 'show/' + user.id, {
      headers: this.authorizationHeaders,
    });
  }

  delete(user: User) {
    return this.http.delete(this.endPointWithSlash + 'destroy/' + user.id, {
      headers: this.authorizationHeaders,
    });
  }
}
