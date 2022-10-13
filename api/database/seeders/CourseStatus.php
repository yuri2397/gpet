<?php

namespace Database\Seeders;

use App\Models\CourseStatus as CS;
use Illuminate\Database\Seeder;

class CourseStatus extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = [
            [
                "name" => "Términer",
                "code" => "finish",
                "number" => 4,
            ],
            [
                "name" => "En cours",
                "code" => "load",
                "number" => 3,
            ],
            [
                "name" => "Annuler",
                "code" => "cancel",
                "number" => 2,
            ],
            [
                "name" => "En attente",
                "code" => "wait",
                "number" => 1,
            ],
        ];

        foreach ($status as $key => $value) {
            $s = new CS();
            $s->label = $value["name"];
            $s->code = $value["code"];
            $s->number = $value["number"];
            $s->save();
        }
    }
}
