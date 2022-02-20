<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\Salle;
use App\Models\TimesTable;


trait Utils
{   
    protected $start = "08:00";
    protected $end = "19:00";
    protected $userProfilPath = "user-profile";

    protected $hours = [
        ["08:00", "09:00"],
        ["09:00", "10:00"],
        ["10:00", "11:00"],
        ["11:00", "12:00"],
        ["12:00", "13:00"],
        ["13:00", "14:00"],
        ["14:00", "15:00"],
        ["15:00", "16:00"],
        ["16:00", "17:00"],
        ["17:00", "18:00"],
        ["18:00", "18:00"],
    ];
    public function hourEmbedHour($start, $end, $emdStart, $emdEnd)
    {
        // $start = 15:00, $end = 18:00
        // $emdStart = 8:00, $emdEnd = 12:00
        if (
        ($start < $emdStart && $end <= $emdStart) || ($start >= $emdEnd && $end > $emdEnd)
        ) {
            return false;
        }
        return true;
    }

    public function uploadImage(Request $request, $path)
    {
        if ($request->hasFile('file')) {

            $request->file->store($path, 'public');

            return $request->file->hashName();
        }
        return null;
    }

    public function isSalleFree(Salle $salle, $start, $end): bool{
        $tps = TimesTable::whereSalleId($salle->id)->get();
        $test = true;
        if($tps){
            foreach ($tps as $value) {
                if($this->hourEmbedHour($start, $end, $value->start, $value->end)){
                    $test = false;
                    break;
                }
            }
        }
        return $test;
    }
}
