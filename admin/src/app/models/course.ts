export interface Course {
  id: number;
  acronym: string;
  name: string;
  groupe_number: number;
  classe_id: number;
  semester_id: number;
  service_id: number;
  ec_id: number;
  professor_id: number;
  created_at: Date;
  updated_at: Date;
  ec: string;
  ue: string;
  semester: string;
  service: string;
  classe: string;
}
