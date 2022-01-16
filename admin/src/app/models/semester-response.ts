import { EC } from './ec';
export interface SemesterResponse {
    id:   number;
    name: string;
    ecs:  EC[];
}
