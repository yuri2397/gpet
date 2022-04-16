import { Model } from "./model";

export class Syllabus extends Model<Syllabus> {
  myIndex(arrays: Syllabus[]): number {
    throw new Error("Method not implemented.");
  }
  some(arrays: Syllabus[]): Syllabus | null {
    throw new Error("Method not implemented.");
  }

  description!: string;
  course_id!: number;
  created_at!: Date;
  updated_at!: Date;

  constructor (){
    super();

  }
}
