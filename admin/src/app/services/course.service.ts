import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Professor } from '../models/professor';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseHttp {

  protected _baseUrl = 'course/';

  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  clone(course: Course) {
    let c = new Course();
    c.acronym = course.acronym;
    c.ec = course.ec;
    c.ec_id = course.ec_id;
    c.groupe_number = course.groupe_number;
    c.id = course.id;
    c.name = course.name;
    c.professor_id = course.professor_id;
    c.semester = course.semester;
    c.semester_id = course.semester_id;
    return c;
  }

  findAll() {
    return this.http.get<Course[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  create(classe: Course) {
    return this.http.post<Course>(
      this.endPoint + 'create',
      {
        name: classe.name,
        acronym: classe.acronym,
        groupe_number: classe.groupe_number,
        classe_id: classe.classe_id,
        service_id: classe.service_id,
        semester_id: classe.semester_id,
        departement_id: classe.departement_id,
        ec_id: classe.ec_id,
        professor_id: classe.professor_id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(course: Course) {
    return this.http.delete<any>(
      this.endPoint + 'destroy/' + course.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(course: Course) {
    return this.http.put<Course>(
      this.endPoint + 'update/' + course.id,
      {
        name: course.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  search(value: string) {
    return this.http.get<Course[]>(
      this.endPoint + 'search/' + value,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
