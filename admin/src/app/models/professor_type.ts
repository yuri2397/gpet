import { Model } from "./model";

export class ProfessorType extends Model<ProfessorType>{
    myIndex(arrays: ProfessorType[]): number {
        throw new Error("Method not implemented.");
    }
    some(arrays: ProfessorType[]): ProfessorType | null {
        throw new Error("Method not implemented.");
    }

    name!: string;
    
}