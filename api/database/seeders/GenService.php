<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class GenService extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = [
            ["name" => "Cour magistral", "amount" => 6500],
            ["name" => "TP/TD", "amount" => 50],
        ];

        foreach($services as $s){
            Service::create($s);
        }
    }
}
