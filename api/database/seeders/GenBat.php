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
            "BAT1 UFR SET",
            "BAT2 UFR SET",
            "Chapiteau UFR SET",
            "BAT administratif UFR SET",
            "Immeuble Bal",
            "EPT",
            "BAT3 UFR SET",
        ];

        foreach($bats as $bat){
            DB::table("batiments")->insert(["name" => $bat]);
        }
    }
}
