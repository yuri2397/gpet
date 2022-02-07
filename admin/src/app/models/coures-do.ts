import { Course } from './course';
import { Professor } from './professor';

export class CoursesDo {
  id!: number;
  course_id!: number;
  professor_id!: number;
  amount!: number;
  total_hours!: string;
  total_sales!: string;
  is_paid!: boolean;
  professor!: Professor;
  course!: Course;
}
