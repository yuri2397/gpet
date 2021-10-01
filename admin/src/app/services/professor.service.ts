import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService extends BaseHttp {
  protected _baseUrl = 'professeur/';
  constructor(private http: HttpClient) {
    super();
  }

  findAll() {
    return this.http.get<Professor[]>(this.api + this.baseUrl, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  find(id: number) {
    return this.http.get<Professor>(this.api + this.baseUrl + 'show/' + id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  clone(professor: Professor): any {
    let b = new Professor();
    b.id = professor.id;
    b.registration_number = professor.registration_number;
    b.first_name = professor.first_name;
    b.last_name = professor.last_name;
    b.email = professor.email;
    b.avatar = professor.avatar;
    b.status = professor.status;
    b.job = professor.job;
    b.is_active = professor.is_active;
    return b;
  }

  create(professor: Professor) {
    return this.http.post<Professor>(
      this.api + this.baseUrl + 'create',
      {
        first_name: professor.first_name,
        last_name: professor.last_name,
        email: professor.email,
        avatar: professor.avatar,
        status: professor.status,
        job: professor.job,
        is_active: professor.is_active,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(professor: Professor) {
    return this.http.delete<any>(
      this.api + this.baseUrl + 'destroy/' + professor.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(professor: Professor) {
    return this.http.put<Professor>(
      this.api + this.baseUrl + 'update/' + professor.id,
      {
        first_name: professor.first_name,
        last_name: professor.last_name,
        email: professor.email,
        avatar: professor.avatar,
        status: professor.status,
        job: professor.job,
        is_active: professor.is_active,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
