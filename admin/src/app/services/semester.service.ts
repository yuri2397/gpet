import { SemesterResponse } from './../models/semester-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../models/departement';
import { Semester } from '../models/semester';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class SemesterService extends BaseHttp {
  protected _baseUrl = 'semester';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  clone(item: Semester): Semester {
    let c = new Semester();
    c.id = item.id;
    c.departement = item.departement;
    c.departement_id = item.departement_id;
    c.name = item.name;
    return c;
  }

  findByDepartement(departement: Departement) {
    return this.http.get<Semester[]>(
      this.endPointWithSlash + 'by-departement/' + departement.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  create(semester: Semester) {
    return this.http.post<Semester>(
      this.endPointWithSlash + 'create',
      {
        name: semester.name,
        departement_id: semester.departement_id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  edit(semester: Semester) {
    return this.http.put<Semester>(
      this.endPointWithSlash + 'update/' + semester.id,
      {
        name: semester.name,
      },
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  delete(semester: Semester) {
    return this.http.delete<Semester>(
      this.endPointWithSlash + 'delete/' + semester.id,
      {
        headers: this.authorizationHeaders,
      }
    );
  }
}
