import { Permission } from './../models/permission';
import { Role } from './../models/role';
import { Model } from "../models/model";

export abstract class GestionRole{

    can(required: Permission, roles: Role[]){
        let test = false;
        roles.forEach(e => {
            e.permissions.forEach(p => {
                if(p.name == required.name){
                    test = true;
                }
            });
        });

        return test;
    }
}