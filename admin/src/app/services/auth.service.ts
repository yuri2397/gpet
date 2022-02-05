import { LoginResponse } from './../models/login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseHttp } from '../shared/base-http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  protected _baseUrl = 'user';

  constructor(protected hc: HttpClient, private router: Router) {
    super();
    this.http = hc;
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      this.endPointWithSlash + 'login',
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
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  alreadyConnect() {
    if (this.isLogIn()) {
      return this.router.navigate(['/admin']);
    } else {
      return this.router.navigate(['/']);
    }
  }

  updatePassword(password: string, new_password: string) {
    return this.http.post<User>(
      this.endPointWithSlash + 'update-password',
      {
        password: password,
        new_password: new_password,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  updateAvatar(data: any) {
    var myFormData = new FormData();
    myFormData.append('image', data);

    return this.http.post<User>(
      this.endPointWithSlash + 'update-avatar',
      myFormData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.getToken(),
        },
      }
    );
  }
}
