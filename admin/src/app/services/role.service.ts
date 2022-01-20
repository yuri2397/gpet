import { HttpClient } from '@angular/common/http';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseHttp {
  protected _baseUrl: string = 'role';
  constructor(protected httpCl: HttpClient) {
    super();
    this.httpClient = httpCl;
  }

  findWhenCreateUser() {
    return this.http.get<Role[]>(this.endPointWithSlash + 'when-create-user', {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }
}
