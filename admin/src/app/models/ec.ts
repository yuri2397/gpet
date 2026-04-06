import { Model } from "./model";
import { UE } from "./ue";

export class EC extends Model<EC> {
  code!: string;
  name!: string;
  ue_id!: number;
  vht!: number;
  ue!: UE;
  constructor(){
    super();
    this.ue = new UE();
  }
}
