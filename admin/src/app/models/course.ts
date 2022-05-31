import { Syllabus } from 'src/app/models/syllabus';
import { Bank } from 'src/app/models/bank';
import { Service } from './service';
import { Classe } from './classe';
import { Departement } from './departement';
import { EC } from './ec';
import { Professor } from './professor';
import { Semester } from './semester';
import { Model } from './model';

export class Course extends Model<Course> {
  acronym?: string;
  name!: string;
  groupe_number!: number;
  classe_id!: number;
  semester_id!: number;
  service_id!: number;
  hours!: number;
  ec_id!: number;
  professor_id!: number;
  departement_id!: number;
  professor!: Professor;
  departement!: Departement;
  classe!: Classe;
  evolution!: Array<number>;
  ec!: EC;
  semester!: Semester;
  service!: Service;
  syllabus!: Syllabus;
  media!: Media[];
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

  some(arrays: Course[]): Course | null {
    let res = this.myIndex(arrays);
    if (res != -1) return arrays[res];
    return null;
  }
}

export interface CourseResponse {
  current_page: number;
  data: Course[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface Media extends Model<Media> {
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: Date;
  updated_at: Date;
  original_url: string;
  preview_url: string;
}
