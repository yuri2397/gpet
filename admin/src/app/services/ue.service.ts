import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UE } from '../models/ue';
import { BaseHttp } from '../shared/base-http';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root',
})
export class UEService extends BaseHttp {
  protected _baseUrl = 'ue';
  constructor(protected hc: HttpClient, private bankService: BankService) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<UE[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  search(data: string) {
    return this.http.get<UE[]>(this.endPointWithSlash + 'search/' + data, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  edit(ue: UE) {
    return this.http.put<UE>(
      this.endPointWithSlash + 'update/' + ue.id,
      {
        name: ue.name,
        code: ue.code,
      },
      {
        headers: this.authorizationHeaders,
      }
    );
  }

  delete(ue: UE) {
    return this.http.delete<any>(this.endPointWithSlash + 'destroy/' + ue.id, {
      headers: this.authorizationHeaders,
    });
  }

  clone(ue: UE): UE {
    let c = new UE();
    c.name = ue.name;
    c.id = ue.id;
    c.code = ue.code;
    c.disabled = c.disabled;
    c.loading = c.loading;
    return c;
  }
}
