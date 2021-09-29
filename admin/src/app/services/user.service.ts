import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttp {
  protected _baseUrl = 'user/';
  constructor(private http: HttpClient) {
    super();
  }

  currentUser() {
    return this.http.get<User>(this.api + this.baseUrl + 'profile', {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }
}
