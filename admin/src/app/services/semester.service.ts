import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../models/departement';
import { Semester } from '../models/semester';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class SemesterService extends BaseHttp {
  protected _baseUrl = 'semester/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  findByDepartement(departement: Departement){
    return this.http.get<Semester[]>(this.endPoint + "by-departement/" + departement.id, {
      headers: this.authorizationHeaders,
      observe: 'body'
    })
  }
}
