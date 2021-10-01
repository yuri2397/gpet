import { Account } from './account';
import { CoursesDo } from './coures-do';
import { Course } from './course';

export class Professor {
  id!: number;
  registration_number!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  avatar!: null;
  status!: string;
  job!: string;
  phone_number!: string;
  is_active!: number;
  created_at!: null;
  updated_at!: null;
  departement_id!: number;
  coursesDo!: CoursesDo[];
  account!: Account;
  courses!: Course[];
}
