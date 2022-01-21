import { Permission } from './permission';
export class Role {
  id!: number;
  name!: string;
  guard_name!: string;
  permissions!: Permission[];
}
