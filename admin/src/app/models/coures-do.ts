import { Course } from "./course";
import { Professor } from "./professor";

export class CoursesDo {
  course_id!: number;
    professor_id!: number;
    amount!: number;
    total_hours!: string;
    total_sales!: string;
    professor!:    Professor;
    course!: Course;
}
