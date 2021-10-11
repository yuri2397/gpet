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
    return this.http.get<any>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  findByDepartement(id: number) {
    return this.http.get<Classe[]>(
      this.endPoint + 'departement/' + id,
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
      this.endPoint + 'create',
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
      this.endPoint + 'destroy/' + classe.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(classe: Classe) {
    return this.http.put<Classe>(
      this.endPoint + 'update/' + classe.id,
      {
        name: classe.name,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}