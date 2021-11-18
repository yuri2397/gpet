import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EC } from '../models/ec';
import { BaseHttp } from '../shared/base-http';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root'
})
export class ECService extends BaseHttp {
  protected _baseUrl = 'ec/';
  constructor(
    protected hc: HttpClient,
    private bankService: BankService,
  ) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<EC[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  search(data: string){
    return this.http.get<EC[]>(this.endPoint + 'search/' + data, {
      headers: this.authorizationHeaders,
      observe: 'body',
    })
  }



  create(ec: EC) {
    return this.http.post<EC>(
      this.endPoint + 'create',
      {
        name: ec.name,
        code: ec.code,
        ue_id: ec.ue_id == -1 ? -1 : ec.ue_id,
        ue_name: ec.ue.name,
        ue_code: ec.ue.code,
        departement_id: ec.ue.departement_id
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }
}
