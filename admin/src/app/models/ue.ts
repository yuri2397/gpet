import { Departement } from './departement';
import { Model } from './model';

export class UE extends Model<UE> {
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
  id!: number;
  code!: string;
  name!: string;
  departement_id!: number;
  departement!: Departement;

  constructor() {
    super();
    this.departement = new Departement();
  }
}
