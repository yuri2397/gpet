import { Course } from "./course";
import { Departement } from "./departement";

export class Classe {
  id!: number;
  name!: string;
  timestable_date!: Date;
  nb_students!: number;
  departement_id!: number;
  courses!: Course[];
  departement!: Departement;
}
