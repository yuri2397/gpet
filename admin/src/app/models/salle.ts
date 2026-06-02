import { Departement } from './departement';
import { Batiment } from './batiment';

export class Salle {
  id!: number;
  name!: string;
  number!: number;
  capacity!: string;
  batiment_id!: number;
  departement_id!: number;
  departement!: Departement;
  batiment!: Batiment;
}
