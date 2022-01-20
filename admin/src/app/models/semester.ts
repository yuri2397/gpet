import { Departement } from './departement';
import { UE } from 'src/app/models/ue';
export class Semester {
  id!: number;
  name!: string;
  departement_id!: number;
  departement!: Departement;
  ues!: UE[];
  constructor(){
    this.departement = new Departement();
  }
}
