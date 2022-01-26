import { Permission } from './../models/permission';
import { Role } from './../models/role';
import { Model } from '../models/model';

export abstract class GestionRole {
  can(required: Permission, permissions: Permission[]) {
    let test = false;
    permissions.forEach((p) => {
      if (p.name == required.name) {
        test = true;
      }
    });
    return test;
  }
}
