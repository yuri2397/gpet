import { Departement } from './../models/departement';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root',
})
export class DepartementService extends BaseHttp {
  protected _baseUrl = 'departement';
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

  dashboard() {
    return this.http.get<any>(this.endPointWithSlash + 'dashboard', {
      headers: this.authorizationHeaders,
    });
  }

  find(departement: Departement) {
    return this.http.get<Departement>(
      this.endPointWithSlash + 'show/' + departement.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  clone(batiment: Departement): any {
    let b = new Departement();
    b.id = batiment.id;
    b.name = batiment.name;
    return b;
  }

  create(batiment: Departement) {
    return this.http.post<Departement>(
      this.endPointWithSlash + 'create',
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
      this.endPointWithSlash + 'destroy/' + batiment.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  edit(batiment: Departement) {
    return this.http.put<Departement>(
      this.endPointWithSlash + 'update/' + batiment.id,
      {
        name: batiment.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
  listSalleDept(dept:Departement){
    console.log("id dept: "+dept.id);
    console.log(this.endPointWithSlash);
    return this.http.get<Salle[]>(
      this.endPointWithSlash + 'listSalleDept/' + dept.id,
      { headers: this.authorizationHeaders, 
        observe: 'body'
      }
    );

  }
}
