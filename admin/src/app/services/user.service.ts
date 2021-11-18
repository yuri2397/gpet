import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttp {

  protected _baseUrl = 'user/';
  constructor(
    protected hc: HttpClient,
    private router: Router
  ) {
    super();
    this.http = hc;
  }

  currentUser() {
    return this.http.get<User>(this.endPoint + 'profile', {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
