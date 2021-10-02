import { Batiment } from './../models/batiment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class BatimentService extends BaseHttp {

  protected _baseUrl = 'batiment/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<Batiment[]>(this.api + this.baseUrl, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  clone(batiment: Batiment): any {
    let b = new Batiment();
    b.id = batiment.id;
    b.name = batiment.name;
    return b;
  }

  create(batiment: Batiment) {
    return this.http.post<Batiment>(
      this.api + this.baseUrl + 'create',
      {
        name: batiment.name,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(batiment: Batiment) {
    return this.http.delete<any>(
      this.api + this.baseUrl + 'destroy/' + batiment.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(batiment: Batiment) {
    return this.http.put<Batiment>(
      this.api + this.baseUrl + 'update/' + batiment.id,
      {
        name: batiment.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
