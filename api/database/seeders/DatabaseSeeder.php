<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call([
        //     CourseStatus::class,
        //     GenDays::class,
        //     GenRoles::class,
        //     GenService::class,
        // ]);
        // new user
        $user = new User();
        $user->first_name = "Mor";
        $user->last_name = "Diaw";
        $user->email = "admin@gmail.com";
        $user->avatar = "https://ui-avatars.com/api/?name=Mor+Diaw";
        $user->email_verified_at = now();
        $user->password = Hash::make("Matrix@2397!");
        $user->save();
    }
}
