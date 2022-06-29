import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PdfService extends BaseHttp {
  protected _baseUrl = 'pdf';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  downloadEDT(classe_id: number) {
    return this.http.get<Blob>(this.endPointWithSlash + 'edt/' + classe_id, {
      responseType: 'html' as 'json',
    }).pipe(tap(() => console.log('Emploie du temps')));
  }
}
