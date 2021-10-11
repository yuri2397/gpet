import { Service } from './service';
import { Classe } from './classe';
import { Departement } from './departement';
import { EC } from './ec';
import { Professor } from './professor';
import { Semester } from './semester';
import { Model } from './model';

export class Course extends Model<Course> {
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
  service!: Service;

  constructor() {
    super();
    this.professor = new Professor();
    this.departement = new Departement();
    this.classe = new Classe();
    this.ec = new EC();
    this.semester = new Semester();
    this.service = new Service();
  }

  myIndex(arrays: Course[]): number {
    let res = -1;
    arrays.forEach((course: Course, index: number) => {
      if (course.id === this.id) res = index;
    });
    return res;
  }

  some(arrays: Course[]): Course | null{
    let res = this.myIndex(arrays);
    if (res != -1) return arrays[res];
    return null;
  }
}
