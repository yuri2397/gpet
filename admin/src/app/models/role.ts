import { Model } from './model';
import { Permission } from './permission';
export class Role extends Model<Role> {
  name!: string;
  guard_name!: string;
  permissions!: Permission[];
}
