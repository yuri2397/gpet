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
        Role::create(['name' => 'informatique admin', 'guard_name' => ""]);
        Role::create(['name' => 'math admin']);
        Role::create(['name' => 'ee admin']);
        Role::create(['name' => 'pc admin']);
        Role::create(['name' => 'super admin']);
        Role::create(['name' => 'directeur']);
        Role::create(['name' => 'vice directeur']);
        Role::create(['name' => 'superviseur']);

    }
}
