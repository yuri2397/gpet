import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UE } from '../models/ue';
import { BaseHttp } from '../shared/base-http';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root'
})
export class UEService extends BaseHttp {
  protected _baseUrl = 'ue';
  constructor(
    protected hc: HttpClient,
    private bankService: BankService,
  ) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<UE[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  search(data: string){
    return this.http.get<UE[]>(this.endPointWithSlash + 'search/' + data, {
      headers: this.authorizationHeaders,
      observe: 'body',
    })
  }


}
