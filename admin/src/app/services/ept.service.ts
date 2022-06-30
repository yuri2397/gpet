import { Departement } from 'src/app/models/departement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models/classe';
import { EPT } from '../models/ept';
import { EptRow } from '../models/ept-row';
import { BaseHttp } from '../shared/base-http';

@Injectable({
  providedIn: 'root',
})
export class EptService extends BaseHttp {
  protected _baseUrl = 'ept';
  constructor(protected hc: HttpClient) {
    super();
    this.http = hc;
  }

  clone(item: EPT): EPT {
    let e = new EPT();
    e.id = item.id;
    e.classe_id = item.classe_id;
    e.active = item.active;
    e.course = item.course;
    e.active = item.active;
    e.day = item.day;
    e.day_id = item.day_id;
    let d = new Date();
    d.setHours(parseInt(item.start.toString().substring(0, 2)));
    d.setMinutes(parseInt(item.start.toString().substring(3, 6)));
    e.start = d;
    d = new Date();
    d.setHours(parseInt(item.end.toString().substring(0, 2)));
    d.setMinutes(parseInt(item.end.toString().substring(3, 6)));
    e.end = d;
    e.disabled = item.disabled;
    e.removeLoad = item.removeLoad;
    return e;
  }

  show(classe: Classe) {
    return this.http.get<EptRow[]>(
      this.endPointWithSlash + 'show/' + classe.id,
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  remove(item: EPT) {
    return this.http.delete(this.endPointWithSlash + 'destroy/' + item.id, {
      headers: this.authorizationHeaders,
      observe: 'body',
    });
  }

  create(item: EPT) {
    return this.http.post<EPT>(
      this.endPointWithSlash + 'create',
      {
        start: item.start,
        end: item.end,
        classe_id: item.classe_id,
        salle_id: item.salle.id ?? null,
        course_id: item.course.id,
        day_id: item.day.id,
        group: item.group ?? 1,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  update(item: EPT) {
    return this.http.put<EPT>(
      this.endPointWithSlash + 'update/' + item.id,
      {
        start: item.start,
        end: item.end,
        classe_id: item.classe_id,
        salle_id: item.salle.id ?? null,
        course_id: item.course.id,
        day_id: item.day.id,
        ept_id: item.id,
        group: item.group ?? 1,
      },
      {
        headers: this.authorizationHeaders,
        observe: 'body',
      }
    );
  }

  getEDT(departement: Departement, classe: Classe) {
    return this.http.get<EptRow[]>(
      this.endPointWithSlash + 'ws/' + departement + '/' + classe,
      {
        headers: this.guestHeaders,
        observe: 'body',
      }
    );
  }

  getEDTByCurrentProfessor() {
    return this.http.get<EptRow[]>(
      this.endPointWithSlash + 'ept_by_current_professor',
      {
        headers: this.guestHeaders,
        observe: 'body',
      }
    );
  }
}
