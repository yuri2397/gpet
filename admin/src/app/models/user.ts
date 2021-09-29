import { Role } from "./role";

export class User {
  first_name!: string;
  last_name!: string;
  email!: string;
  avatar!: string;
  id!: number;
  roles! : Role[];
}
