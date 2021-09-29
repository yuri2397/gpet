import { Salle } from './../models/salle';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Batiment } from '../models/batiment';

@Injectable({
  providedIn: 'root',
})
export class SalleService extends BaseHttp{
  protected _baseUrl = 'salle/';
  constructor(private http: HttpClient) {
    super();
  }

  findAll() {
    return this.http.get<Salle[]>(this.api + this.baseUrl, {
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
      this.api + this.baseUrl + 'create',
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
      this.api + this.baseUrl + 'destroy/' + salle.id,
      { headers: this.authorizationHeaders, observe: 'body' }
    );
  }

  edit(salle: Salle) {
    return this.http.put<Salle>(
      this.api + this.baseUrl + 'update/' + salle.id,
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
}
