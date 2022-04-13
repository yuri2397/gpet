import { Model } from 'echarts';
import { Departement } from 'src/app/models/departement';
import { Batiment } from './batiment';
export class Salle  {

  id!: number;
  name!: string;
  number!: number;
  capacity!: String;
  batiment_id!: number;
  departement_id!: number;
  departement!: Departement;
  batiment!: Batiment;

}
