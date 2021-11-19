import { Bank } from './../models/bank';
import { HttpClient } from '@angular/common/http';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankService extends BaseHttp {
  protected _baseUrl = 'bank/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  clone(bank: Bank) {
    let b = new Bank();
    b.name = bank.name;
    b.code = bank.code;
    b.id = bank.id;
    return b;
  }

  findAll() {
    return this.http.get<Bank[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  edit(bank: Bank){
    return this.http.put<Bank>(
      this.endPoint + 'update/' + bank.id,
      {
        name: bank.name,
        code: bank.code,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  delete(bank: Bank){
    return this.http.delete<any>(
      this.endPoint + 'destroy/' + bank.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  create(bank: Bank) {
    return this.http.post<Bank>(
      this.endPoint + 'create',
      {
        name: bank.name,
        code: bank.code,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  search(data: string) {
    return this.http.get<Bank[]>(this.endPoint + 'search/' + data, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }
}
