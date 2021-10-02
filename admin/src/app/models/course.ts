import { Classe } from './classe';
import { Departement } from './departement';
import { EC } from './ec';
import { Professor } from './professor';
import { Semester } from './semester';

export class Course {
  id!: number;
  acronym!: string;
  name!: string;
  groupe_number!: number;
  classe_id!: number;
  semester_id!: number;
  service_id!: number;
  ec_id!: number;
  professor_id!: number;
  created_at!: Date;
  updated_at!: Date;
  departement_id!: number;
  professor!: Professor;
  departement!: Departement;
  classe!: Classe;
  ec!: EC;
  semester!: Semester;
  service!: Semester;
}
