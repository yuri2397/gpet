<?php

namespace Database\Seeders;

use App\Models\Departement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUser extends Seeder
{
    public function run(): void
    {
        $departement = Departement::first();

        $user = User::create([
            'first_name' => 'Super',
            'last_name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'password',
            'departement_id' => $departement?->id,
        ]);

        $user->assignRole('super admin');
    }
}
