import { Model } from './model';

export class Permission extends Model<Permission> {
  myIndex(arrays: Permission[]): number {
      throw new Error('Method not implemented.');
  }
  some(arrays: Permission[]): Permission | null {
      throw new Error('Method not implemented.');
  }
  name!: string;
}
