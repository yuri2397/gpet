import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Course, Media } from '../models/course';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class RessourceService extends BaseHttp {
  
  protected _baseUrl = 'ressource';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  upload(item: any, course: Course): Observable<any> {
    let data = new FormData();
    data.append('medias', item);
    data.append('course_id', course.id as any);
    return this.http.post<any>(
      this.endPointWithSlash + `upload-for-course`,
      data,
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  uploadUrl(course: Course): Observable<string>{
    return this.http.get<string>(this.endPointWithSlash + "upload-url/" + course.id, {
      headers: this.authorizationHeaders
    });
  }


  download(item: Media) {
    return this.http.get<any>(this.endPointWithSlash + `download/${item.id}`)
  }
}
