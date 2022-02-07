import { Day } from "./day";
import { EPT } from "./ept";

export interface EptRow {
  day:  Day;
  data: EPT[];
  active: boolean;
  addLoad: boolean;
}
