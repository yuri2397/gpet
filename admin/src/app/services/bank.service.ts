import { Bank } from './../models/bank';
import { HttpClient } from '@angular/common/http';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankService extends BaseHttp {
  protected _baseUrl = 'bank';
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
    return this.http.get<Bank[]>(this.endPoint,);
  }

  edit(bank: Bank){
    return this.http.put<Bank>(
      this.endPointWithSlash + 'update/' + bank.id,
      {
        name: bank.name,
        code: bank.code,
      },
    );
  }

  delete(bank: Bank){
    return this.http.delete<any>(
      this.endPointWithSlash + 'destroy/' + bank.id,

    );
  }

  create(bank: Bank) {
    return this.http.post<Bank>(
      this.endPointWithSlash + 'create',
      {
        name: bank.name,
        code: bank.code,
      },

    );
  }

  search(data: string) {
    return this.http.get<Bank[]>(this.endPointWithSlash + 'search/' + data, );
  }
}
