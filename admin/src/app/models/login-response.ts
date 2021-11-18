import { User } from "./user";

export class LoginResponse {
  token!: string;
  user!: User;
}
