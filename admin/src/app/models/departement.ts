import { Classe } from "./classe";
import { Course } from "./course";
import { Professor } from "./professor";

export class Departement {
  id!: number;
  name!: string;
  classes!: Classe[];
  professors!: Professor[];
  courses!: Course[];
}
