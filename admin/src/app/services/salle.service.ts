import { Salle } from './../models/salle';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batiment } from '../models/batiment';

@Injectable({
  providedIn: 'root',
})
export class SalleService extends BaseHttp{

  protected _baseUrl = 'salle';
  constructor(
    protected hc: HttpClient,
  ) {
    super();
    this.http = hc;
  }
  findAll() {
    return this.http.get<Salle[]>(this.endPoint, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  clone(salle: Salle): any {
    let b = new Salle();
    b.id = salle.id;
    b.number = salle.number;
    b.name = salle.name;
    b.capacity = salle.capacity;
    b.departement = salle.departement;
    b.batiment = salle.batiment;
    b.departement_id = salle.departement_id;
    b.batiment_id = salle.batiment_id;
    return b;
  }

  create(salle: Salle) {
    return this.http.post<Salle>(
      this.endPointWithSlash + 'create',
      {
        name: salle.name,
        number: salle.number,
        capacity: salle.capacity,
        departement_id: salle.departement_id,
        batiment_id: salle.batiment_id,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  delete(salle: Salle) {
    return this.http.delete<any>(
      this.endPointWithSlash + 'destroy/' + salle.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(salle: Salle) {
    return this.http.put<Salle>(
      this.endPointWithSlash + 'update/' + salle.id,
      {
        name: salle.name,
        number: salle.number,
        capacity: salle.capacity,
        departement_id: salle.departement_id,
        batiment_id: salle.batiment_id,
      },
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  search(data: string) {
    return this.http.get<Salle[]>(
      this.endPointWithSlash + 'search/' + data,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }
}
