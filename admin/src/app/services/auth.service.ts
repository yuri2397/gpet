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
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      this.api + this.baseUrl + 'login',
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

  alreadyConnect() {
    if (this.isLogIn()) {
      if (this.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/departement']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
