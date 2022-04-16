import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Syllabus } from '../models/syllabus';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})

export class SyllabusService extends BaseHttp {

  protected _baseUrl = 'syllabus';

  constructor(private hc : HttpClient){
    super();
    this.http = hc;
  }

  clone(item: Syllabus): Syllabus {
    let c = new Syllabus();
    c.id = item.id;
    c.description = item.description;
    c.course_id = item.course_id;
    return c;
  }

  create(syllabus: Syllabus) {
    return this.http.post<Syllabus>(
      this.endPointWithSlash + 'create',
      {
        description: syllabus.description,
        course_id: syllabus.course_id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

}
