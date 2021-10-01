import { Bank } from "./bank";

export class Account {
  id!: number;
  rip!: string;
  account_number!: string;
  key!: string;
  professor_id!: number;
  bank_id!: number;
  created_at!: Date;
  updated_at!: Date;
  bank!: Bank;
}
