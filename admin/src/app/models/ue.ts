import { Semester } from 'src/app/models/semester';
import { EC } from 'src/app/models/ec';
import { Departement } from './departement';
import { Model } from './model';

export class UE extends Model<UE> {
  
  semester_id!: number;
  semester!: Semester;
  id!: number;
  code!: string;
  name!: string;
  departement_id!: number;
  departement!: Departement;
  ecs!: EC[];
  constructor() {
    super();
    this.departement = new Departement();
  }
}
