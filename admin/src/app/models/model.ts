export abstract class Model<T> {
  id!: number;
  deleted = false;
  add = false;
  loading = false;
  updated = false;
  checked = false;
  created_at!: Date;
  updated_at!: Date;
  disabled = false;
}
