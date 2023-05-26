<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function __construct()
    {

    }

    public function index()
    {
        return Role::with("permissions")->get();
    }

    public function findRoleOnUserCreate()
    {
        return Role::with("permissions")->get();
            //->where("name", "!=", "super admin")
           
    }

    public function addRoleForUser(Request $request)
    {
        $this->validate($request, [
            "roles[]" => "required",
            "user_id" => "required|exists:users,id"
        ]);

        $user = User::find($request->user_id);
        $user->assignRole($request->roles);
        return $user;
    }

    public function removeRoleForUser(Request $request)
    {
        $this->validate($request, [
            "roles[]" => "required",
            "user_id" => "required|exists:users,id"
        ]);

        $user = User::find($request->user_id);
        $user->removeRole($request->roles);
        return $user;
    }

    public function givePermissionToRole(Request $request)
    {
        $this->validate($request, [
            "role_id" => "required|exists:roles,id",
            "permissions[]" => "required"
        ]);

        $role = Role::find($request->role_id);
        $permissions = Permission::find($request->permissions);
        $role->syncPermissions($permissions);
        return $role;
    }

    public function removePermissionToRole(Request $request)
    {
        $this->validate($request, [
            "role_id" => "required|exists:roles,id",
            "permission_id" => "required"
        ]);

        $role = Role::find($request->role_id);
        $permission = Permission::find($request->permission_id);
        $role->revokePermissionTo($permission);
        return $role;
    }

    public function removePermissionForUser(Request $request)
    {
        $this->validate($request, [
            "user_id" => "required|exists:users,id",
            "permission_id" => "required|exists:permissions,id"
        ]);

        $user = User::find($request->user_id);
        $user->revokePermissionTo(Permission::find($request->permission_id));
        return $user;
    }

    public function searchPermission($data)
    {
        return Permission::where('name', 'like', '%' . $data . '%')
        ->get();
    }

    public function givePermissionToUser(Request $request)
    {
        $this->validate($request, [
            "user_id" => "required|exists:users,id",
            "permissions" => "required|array"
        ]);
        $user = User::find($request->user_id);
        $user->givePermissionTo($request->permissions);
        return $user;
    }
}
