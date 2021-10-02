import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models/classe';
import { Departement } from '../models/departement';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class ClasseService extends BaseHttp {
  protected _baseUrl = 'classe/';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<Classe[]>(this.api + this.baseUrl, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  findByDepartement(id: number) {
    return this.http.get<Classe[]>(
      this.api + this.baseUrl + 'departement/' + id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  clone(classe: Classe): any {
    let b = new Classe();
    b.id = classe.id;
    b.name = classe.name;
    return b;
  }

  create(classe: Classe) {
    return this.http.post<Classe>(
      this.api + this.baseUrl + 'create',
      {
        name: classe.name,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(classe: Classe) {
    return this.http.delete<any>(
      this.api + this.baseUrl + 'destroy/' + classe.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(classe: Classe) {
    return this.http.put<Classe>(
      this.api + this.baseUrl + 'update/' + classe.id,
      {
        name: classe.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
