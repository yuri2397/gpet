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
          'Management des Organisations',
          'Langues, Lettres et Sciences Humaines',
          'Sciences Economiques et Gestion',
        ];

        foreach($depts as $dep){
            Departement::create(["name" => $dep]);
        }
    }
}
