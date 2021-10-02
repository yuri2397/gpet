import { BaseHttp } from './../shared/base-http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursesDo } from '../models/coures-do';

@Injectable({
  providedIn: 'root'
})
export class CourseDoService extends BaseHttp {
  protected _baseUrl = 'course-do/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }


  clone(course: CoursesDo){
    let c = new CoursesDo();
    c.total_hours = course.total_hours;
    c.total_sales = course.total_sales;
    c.professor = course.professor;
    c.course = course.course;
    return c;
  }
}
