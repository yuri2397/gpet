import { Departement } from './departement';

export class UE {
  id!: number;
  code!: string;
  name!: string;
  departement_id!: number;
  departement!: Departement;

  constructor(){
    this.departement = new Departement();
  }
}
