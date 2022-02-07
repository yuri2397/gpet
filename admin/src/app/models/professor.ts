import { Account } from './account';
import { CoursesDo } from './coures-do';
import { Course } from './course';
import { Departement } from './departement';
import { Model } from './model';
import { ProfessorType } from './professor_type';

export class Professor extends Model<Professor> {
  myIndex(arrays: Professor[]): number {
    throw new Error('Method not implemented.');
  }
  some(arrays: Professor[]): Professor | null {
    throw new Error('Method not implemented.');
  }
  
  registration_number!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  avatar!: null;
  status!: string;
  job!: string;
  phone_number!: string;
  cni!: string;
  born_in!: string;
  born_at!: Date;
  professor_type_id!: number;
  professor_type!: ProfessorType;
  is_active!: boolean;
  last_degree!: string;
  
  departement_id!: number;
  departement!: Departement;
  coursesDo!: CoursesDo[];
  account!: Account;
  courses!: Course[];
  constructor() {
    super();
    this.account = new Account();
    this.professor_type = new ProfessorType();
  }
}
