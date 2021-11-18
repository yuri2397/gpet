import { Departement } from 'src/app/models/departement';
import { Batiment } from './batiment';
export class Salle {
  id!: number;
  number!: number;
  name!: string;
  capacity!: number;
  batiment_id!: number;
  departement_id!: number;
  departement!: Departement;
  batiment!: Batiment;
}
