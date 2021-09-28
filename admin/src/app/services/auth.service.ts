import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  protected _baseUrl = 'user/';
  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string) {
    return this.http.post<string>(
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
}
