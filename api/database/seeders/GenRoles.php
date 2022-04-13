<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class GenRoles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            "admin",
            "chef de département",
            "super admin",
            "professeur",
        ];

        foreach($roles as $r){
            $role = new Role;
            $role->name = $r;
            $role->guard_name = "api";
            $role->save();
        }
    }
}
