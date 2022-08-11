import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, CourseHistory, CourseResponse } from '../models/course';
import { Professor } from '../models/professor';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseHttp {
  protected _baseUrl = 'course';

  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  clone(course: Course): Course {
    let c = new Course();
    c.acronym = course.acronym;
    c.name = course.name;
    c.id = course.id;
    c.hours = course.hours;
    c.classe = course.classe;
    c.classe_id = course.classe_id;
    c.departement = course.departement;
    c.departement_id = course.departement_id;
    c.groupe_number = course.groupe_number;
    c.ec = course.ec;
    c.ec_id = course.ec_id;
    c.semester = course.semester;
    c.semester_id = course.semester_id;
    c.professor = course.professor;
    c.professor_id = course.professor_id;
    c.service = course.service;
    c.service_id = course.service_id;
    return c;
  }

  findAll(page: number, pageSize: number, searchQuery?: string) {
    return this.http.get<CourseResponse>(
      this.endPoint +
        `?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery ?? ''}`,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  create(course: Course) {
    return this.http.post<Course>(
      this.endPointWithSlash + 'create',
      {
        groupe_number: course.groupe_number,
        classe_id: course.classe_id,
        service_id: course.service_id,
        departement_id: course.departement_id,
        ec_id: course.ec_id,
        professor_id: course.professor_id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  show(course: Course) {
    return this.http.get<Course>(this.endPointWithSlash + 'show/' + course.id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  finishCourse(course: Course, status: 'finish' | 'load' | 'load' | 'cancel') {
    return this.http.put<Course>(
      this.endPointWithSlash + 'change-course-status/' + course.id,
      {
        status: status,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  delete(course: Course) {
    return this.http.delete<any>(
      this.endPointWithSlash + 'destroy/' + course.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(course: Course) {
    return this.http.put<Course>(
      this.endPointWithSlash + 'update/' + course.id,
      {
        name: course.name,
        acronym: course.acronym,
        hours: course.hours,
        groupe_number: course.groupe_number,
        classe_id: course.classe.id,
        service_id: course.service.id,
        semester_id: course.semester.id,
        departement_id: course.departement.id,
        ec_id: course.ec_id,
        professor_id: course.professor_id,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  search(value: string) {
    return this.http.get<Course[]>(this.endPointWithSlash + 'search/' + value, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  searchMyCourse(value: string) {
    let professor = this.getUser().professor?.id;
    return this.http.get<Course[]>(
      this.endPointWithSlash +
        `search-my-courses/${value}?professor=${professor}`,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
  courseHistory(professor: Professor) {
    return this.http.get<CourseHistory[]>(
      this.endPointWithSlash + `course-history/${professor.id}`,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
