import { Permission } from 'src/app/models/permission';
import { HttpClient } from '@angular/common/http';
import { BaseHttp } from './../shared/base-http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseHttp {
  protected _baseUrl: string = 'role';
  constructor(protected httpCl: HttpClient) {
    super();
    this.httpClient = httpCl;
  }

  findWhenCreateUser() {
    return this.http.get<Role[]>(this.endPointWithSlash + 'when-create-user');
  }

  findNotSuperAdminRole() {
    return this.http.get<Role[]>(this.endPointWithSlash + 'not-super');
  }

  deletePermissionToRole(role: Role, permission: Permission) {
    return this.http.put<Role>(
      this.endPointWithSlash + 'remove-permission-to-role',
      {
        role_id: role.id,
        permission_id: permission.id,
      },
    );
  }

  findAll() {
    return this.http.get<Role[]>(this.endPoint);
  }

  removePermissionForUser(permission: Permission, user: User) {
    return this.http.put<User>(
      this.endPointWithSlash + 'remove-permission-for-user',
      {
        user_id: user.id,
        permission_id: permission.id,
      },

    );
  }

  searchPermission(data: string) {
    return this.http.get<Permission[]>(
      this.endPointWithSlash + 'search-permission/' + data,

    );
  }

  givePermissionToUser(user: User, permissions: string[]) {
    return this.http.put<User>(this.endPointWithSlash + "give-permission-to-user", {
      user_id: user.id,
      permissions: permissions,
    })
  }
}
