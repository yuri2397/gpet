<?php

namespace Database\Seeders;

use App\Models\Departement;
use Illuminate\Database\Seeder;

class GenDep extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $depts = [
            "Département Informatique",
            "Département Mathématique",
            "Département Physique Chimie",
            "Département Hydrosciences et Environnement"
        ];

        foreach($depts as $dep){
            Departement::create(["name" => $dep]);
        }
    }
}
