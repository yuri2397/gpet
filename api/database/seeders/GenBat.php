<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenBat extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bats = [
            'BLOC PEDAGOGIQUE I',
            'BLOC PEDAGOGIQUE II',
            'BLOC PEDAGOGIQUE III',
            'BLOC PEDAGOGIQUE IV',
            'GRANDE SALLE SEG',
            'AMPITHEATRE Pr IBRAHIMA NDIAYE'
        ];

        foreach($bats as $bat){
            DB::table("batiments")->insert(["name" => $bat]);
        }
    }
}
