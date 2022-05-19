import { EptRow } from 'src/app/models/ept-row';
import { EPT } from 'src/app/models/ept';
import { CourseDoService } from './course-do.service';
import { CourseService } from './course.service';
import { BankService } from './bank.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { BaseHttp } from '../shared/base-http';
import { DepartementService } from './departement.service';
import { Course } from '../models/course';
import { CoursesDo } from '../models/coures-do';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService extends BaseHttp {

  professor = new Professor();
  protected _baseUrl = 'professeur';
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
      this.endPointWithSlash + 'search/' + data,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  find(id: number) {
    return this.http.get<Professor>(this.endPointWithSlash + 'show/' + id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  addCourseForProfessor(course: Course, professor: Professor) {
    return this.http.post<Course>(
      this.endPointWithSlash + 'course-to-professor',
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

  doPayment(courseDo: CoursesDo) {
    return this.http.post<any>(
      this.endPointWithSlash + 'do-payment',
      {
        course_id: courseDo.course_id,
        professor_id: courseDo.professor_id,
        total_sales: courseDo.total_sales,
        total_hours: courseDo.total_hours,
        amount_hour: courseDo.amount,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  removeCourse(course: Course) {
    return this.http.put(
      this.endPointWithSlash + 'remove-course-professor',
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
    b.born_at = new Date(professor.born_at);
    b.born_in = professor.born_in;
    b.last_degree = professor.last_degree;
    b.cni = professor.cni;
    b.professor_type_id = professor.professor_type_id;
    b.professor_type = professor.professor_type;

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
      this.endPointWithSlash + 'create',
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
        cni: professor.cni,
        born_at:
          professor.born_at.getFullYear() +
          '-' +
          (professor.born_at.getUTCMonth() + 1) +
          '-' +
          professor.born_at.getDate(),
        born_in: professor.born_in,
        professor_type_id: professor.professor_type_id,
        last_degree: professor.last_degree,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(professor: Professor) {
    return this.http.delete<any>(
      this.endPointWithSlash + 'destroy/' + professor.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  edit(professor: Professor) {
    return this.http.put<Professor>(
      this.endPointWithSlash + 'update/' + professor.id,
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
        cni: professor.cni,
        born_at:
          professor.born_at.getFullYear() +
          '-' +
          (professor.born_at.getUTCMonth() + 1) +
          '-' +
          professor.born_at.getDate(),
        born_in: professor.born_in,
        professor_type_id: professor.professor_type.id,
        last_degree: professor.last_degree,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  desableAccount(professor: Professor) {
    return this.http.put<any>(
      this.endPointWithSlash + 'desable-account/' + professor.id,
      { is_active: !professor.is_active },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  courseDo(hours: number, date: any, course: Course, professor: Professor) {
    return this.http.post<any>(
      this.endPointWithSlash + 'course-do',
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

  courseDoProf(hours: number, date: any, course: Course, professor: Professor) {
    return this.http.post<any>(
      this.endPointWithSlash + 'coursedoprofesseur',
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

  payments(professor: Professor) {
    return this.http.get<Professor>(
      this.endPointWithSlash + 'payments/' + professor.registration_number,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  getProfeseurEPT() {
    return this.http.get<EptRow[]>(
      this.endPointWithSlash + 'timestables/' + this.getUser().professor?.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  profile(){
    return this.http.get<Professor>(this.endPointWithSlash + "profile", {
      headers: this.authorizationHeaders,
      observe: 'body',
    })
  }

  updateAvatar(file: any) {
    var myFormData = new FormData();
    myFormData.append('image', file);

    return this.http.post<Professor>(
      this.endPointWithSlash + 'update-avatar',
      myFormData,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this.getToken(),
        },
      }
    );
  }

}
