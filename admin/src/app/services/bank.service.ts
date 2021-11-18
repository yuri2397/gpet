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

  clone(bank: Bank){
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
}
