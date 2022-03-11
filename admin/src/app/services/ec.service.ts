import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EC } from '../models/ec';
import { Semester } from '../models/semester';
import { BaseHttp } from '../shared/base-http';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root',
})
export class ECService extends BaseHttp {
  protected _baseUrl = 'ec';
  constructor(protected hc: HttpClient, private bankService: BankService) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<EC[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  search(data: string) {
    return this.http.get<EC[]>(this.endPointWithSlash + 'search/' + data, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  create(ec: EC) {
    return this.http.post<EC>(
      this.endPointWithSlash + 'create',
      {
        name: ec.name,
        code: ec.code,
        ue_id: ec.ue_id ?? -1,
        ue_name: ec.ue.name,
        ue_code: ec.ue.code,
        departement_id: ec.ue.departement_id,
        semester_id: ec.ue.semester_id,
        vht: ec.vht,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(item: EC) {
    return this.http.delete(this.endPointWithSlash + 'destroy/' + item.id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  edit(ec: EC) {
    return this.http.put<EC>(
      this.endPointWithSlash + 'update/' + ec.id,
      {
        code: ec.code,
        name: ec.name,
        vht: ec.vht,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  clone(item: EC) {
    let ec = new EC();
    ec.code = item.code;
    ec.name = item.name;
    ec.id = item.id;
    ec.vht = item.vht;
    ec.ue.id = item.ue.id;
    ec.ue.name = item.ue.name;
    ec.ue.departement_id = item.ue.departement_id;
    ec.ue.semester_id = item.ue.semester_id;
    return ec;
  }
}
