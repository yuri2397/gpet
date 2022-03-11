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

  myIndex(arrays: UE[]): number {
    throw new Error('Method not implemented.');
  }
  some(arrays: UE[]): UE | null {
    let a = new UE();
    arrays.forEach((e) => {
      if (this.id == e.id) a = e;
    });
    return a;
  }
}
