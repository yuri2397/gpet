import { Departement } from './../models/departement';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService extends BaseHttp{

  protected _baseUrl = 'departement/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }


  findAll() {
    return this.http.get<Departement[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  clone(batiment: Departement): any {
    let b = new Departement();
    b.id = batiment.id;
    b.name = batiment.name;
    return b;
  }

  create(batiment: Departement) {
    return this.http.post<Departement>(
      this.endPoint + 'create',
      {
        name: batiment.name,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(batiment: Departement) {
    return this.http.delete<any>(
      this.endPoint + 'destroy/' + batiment.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(batiment: Departement) {
    return this.http.put<Departement>(
      this.endPoint + 'update/' + batiment.id,
      {
        name: batiment.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
