import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models/classe';
import { Departement } from '../models/departement';
import { EPT } from '../models/ept';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class ClasseService extends BaseHttp {


  protected _baseUrl = 'classe';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  findAll() {
    return this.http.get<Departement>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  findByDepartement(id: number) {
    return this.http.get<Classe[]>(this.endPointWithSlash + 'departement/' + id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  clone(classe: Classe): Classe {
    let b = new Classe();
    b.id = classe.id;
    b.name = classe.name;
    b.nb_students = classe.nb_students;
    b.departement_id = classe.departement_id;
    return b;
  }

  create(classe: Classe) {
    return this.http.post<Classe>(
      this.endPointWithSlash + 'create',
      {
        name: classe.name,
        departement_id: classe.departement_id,
        nb_students: classe.nb_students,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(classe: Classe) {
    return this.http.delete<any>(this.endPointWithSlash + 'destroy/' + classe.id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  show(classe: Classe) {
    return this.http.get<Classe>(this.endPointWithSlash + 'show/' + classe.id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  edit(classe: Classe) {
    return this.http.put<Classe>(
      this.endPointWithSlash + 'update/' + classe.id,
      {
        name: classe.name,
        departement_id: classe.departement_id,
        nb_students: classe.nb_students,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }


}
