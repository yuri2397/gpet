<?php

namespace Database\Seeders;

use App\Models\Day;
use Illuminate\Database\Seeder;

class GenDays extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $days = [
            ["name" => "Lundi", "number" => "1"],
            ["name" => "Mardi", "number" => "2"],
            ["name" => "Mercredi", "number" => "3"],
            ["name" => "Jeudi", "number" => "4"],
            ["name" => "Vendredi", "number" => "5"],
            ["name" => "Samedi", "number" => "6"],
        ];

        foreach($days as $day){
            Day::create($day);
        }
    }
}
