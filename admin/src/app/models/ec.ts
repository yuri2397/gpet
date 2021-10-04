import { UE } from "./ue";

export class EC {
  id!: number;
  code!: string;
  name!: string;
  ue_id!: number;
  ue!: UE;

  constructor(){
    this.ue = new UE();
  }
}
