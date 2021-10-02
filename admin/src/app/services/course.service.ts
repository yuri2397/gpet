import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
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
    return this.http.get<Course[]>(this.api + this.baseUrl, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  create(classe: Course) {
    return this.http.post<Course>(
      this.api + this.baseUrl + 'create',
      {
        name: classe.name,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(course: Course) {
    return this.http.delete<any>(
      this.api + this.baseUrl + 'destroy/' + course.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(course: Course) {
    return this.http.put<Course>(
      this.api + this.baseUrl + 'update/' + course.id,
      {
        name: course.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
