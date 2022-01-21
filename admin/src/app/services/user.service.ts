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
    localStorage.clear();
    this.router.navigate(['/']);
  }

  findByAuthDepartement() {
    return this.http.get<User[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }
}
