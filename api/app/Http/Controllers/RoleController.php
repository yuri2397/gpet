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
        $this->middleware("permission:voir roles", ['only' => ['index', 'show']]);
        $this->middleware("permission:modifier roles", ['only' => ['addRoleForUser', 'removeRoleForUser']]);
    }

    public function index()
    {
        return Role::with("permissions")->get();
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
}
