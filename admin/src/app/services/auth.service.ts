import { LoginResponse } from './../models/login-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {

  protected _baseUrl = 'user/';

  constructor(protected hc: HttpClient,private router: Router) {
    super();
    this.http = hc;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      this.endPoint + 'login',
      {
        email: email,
        password: password,
      },
      {
        headers: this.guestHeaders,
        observe: 'body',
      }
    );
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  alreadyConnect() {
    if (this.isLogIn()) {
      if (this.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/admin/departement']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
