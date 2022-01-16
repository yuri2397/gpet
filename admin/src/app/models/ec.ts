import { Model } from "./model";
import { UE } from "./ue";

export class EC extends Model<EC> {
  id!: number;
  code!: string;
  name!: string;
  ue_id!: number;
  vht!: number;
  ue!: UE;
  created_at!:     Date;
  updated_at!:     Date;
  constructor(){
    super();
    this.ue = new UE();
  }

  myIndex(arrays: EC[]): number {
    throw new Error("Method not implemented.");
  }
  some(arrays: EC[]): EC | null {
    throw new Error("Method not implemented.");
  }
}
