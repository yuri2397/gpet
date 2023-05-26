import { Departement } from 'src/app/models/departement';
import { Observable } from 'rxjs';
import { BaseHttp } from './../../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicEdtService extends BaseHttp {
  protected _baseUrl = 'public-edt';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  index(params?: any) {
    return this.http.get(this.endPoint, params);
  }

  departements(params?: any): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.endPoint + '/departements', {
      params: params,
    });
  }

  departementClasses(id: any, params?: any) {
    return this.http
      .get(`${this.endPoint}/departements/${id}`, params)
      .pipe(first());
  }

  classeEdt(id: any, params?: any) {
    return this.http.get(`${this.endPoint}/classes/${id}`, params);
  }

  allDepartementEdt(){
    return this.http.get(`${this.endPoint}/all`);
  }
}
