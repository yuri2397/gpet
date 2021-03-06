import { Course } from "./course";
import { Salle } from "./salle";
import { Day } from "./day";
import { Classe } from "./classe";

export class EPT {
  id!: number;
  start!: Date;
  end!: Date;
  classe_id!: number;
  group!: string;
  day_id!: number;
  course_id!: number;
  salle_id!: number;
  professor_id!: number;
  created_at!: Date;
  updated_at!: Date;
  day!: Day;
  salle!: Salle;
  course!: Course;
  classe!: Classe;
  active!: boolean;
  disabled!: boolean;
  removeLoad!: boolean;

  constructor(){
    this.day = new Day();
    this.salle = new Salle();
    this.course = new Course();
  }
}
