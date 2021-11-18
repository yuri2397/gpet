import { CourseDoService } from './course-do.service';
import { CourseService } from './course.service';
import { BankService } from './bank.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { BaseHttp } from '../shared/base-http';
import { DepartementService } from './departement.service';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService extends BaseHttp {
  protected _baseUrl = 'professeur/';
  constructor(protected hc: HttpClient, private bankService: BankService) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<Professor[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  search(data: string) {
    return this.http.get<Professor[]>(
      this.endPoint + 'search/' + data,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  find(id: number) {
    return this.http.get<Professor>(this.endPoint + 'show/' + id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  addCourseForProfessor(course: Course, professor: Professor) {
    return this.http.post<Course>(
      this.endPoint + 'course-to-professor',
      {
        course_id: course.id,
        professor_id: professor.id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  removeCourse(course: Course) {
    return this.http.put(
      this.endPoint + 'remove-course-professor',
      {
        course_id: course.id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
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
    b.phone_number = professor.phone_number;
    b.job = professor.job;
    b.is_active = professor.is_active;
    b.account.key = professor.account.key;
    b.account.rip = professor.account.rip;
    b.account.bank_id = professor.account.bank_id;
    b.account.id = professor.account.id;
    b.account.account_number = professor.account.account_number;
    b.departement = professor.departement;
    b.departement_id = professor.departement_id;
    return b;
  }

  deepClone(professor: Professor) {
    let b: Professor = this.clone(professor);
    b.account.bank = this.bankService.clone(professor.account.bank);
    b.courses = professor.courses;
    b.coursesDo = professor.coursesDo;
    return b;
  }

  create(professor: Professor) {
    return this.http.post<Professor>(
      this.endPoint + 'create',
      {
        first_name: professor.first_name,
        last_name: professor.last_name,
        email: professor.email,
        departement_id: professor.departement_id,
        status: professor.status,
        phone_number: professor.phone_number,
        job: professor.job ?? null,
        rip: professor.account.rip,
        account_number: professor.account.account_number,
        bank_id: professor.account.bank_id,
        key: professor.account.key,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(professor: Professor) {
    return this.http.delete<any>(
      this.endPoint + 'destroy/' + professor.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(professor: Professor) {
    return this.http.put<Professor>(
      this.endPoint + 'update/' + professor.id,
      {
        first_name: professor.first_name,
        last_name: professor.last_name,
        email: professor.email,
        departement_id: professor.departement_id,
        status: professor.status,
        phone_number: professor.phone_number,
        job: professor.job ?? null,
        rip: professor.account.rip,
        account_number: professor.account.account_number,
        bank_id: professor.account.bank_id,
        key: professor.account.key,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  desableAccount(professor: Professor) {
    return this.http.put<Professor>(
      this.endPoint + 'desable-account/' + professor.id,
      { is_active: professor.is_active },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  courseDo(hours: number, date: any, course: Course, professor: Professor) {
    return this.http.post<any>(
      this.endPoint + 'course-do',
      {
        hours: hours,
        date: date,
        professor_id: professor.id,
        course_id: course.id,
        amount: course.service.amount,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }
}
