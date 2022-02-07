import { Model } from './model';
import { Permission } from './permission';
export class Role extends Model<Role> {
  myIndex(arrays: Role[]): number {
    throw new Error('Method not implemented.');
  }
  some(arrays: Role[]): Role | null {
    throw new Error('Method not implemented.');
  }
  name!: string;
  guard_name!: string;
  permissions!: Permission[];
}
