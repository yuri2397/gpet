<?php

namespace App\Traits;

use DateTime;
use App\Models\User;
use App\Models\Salle;
use App\Models\TimesTable;
use Illuminate\Http\Request;


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

    public function isSalleFree(Salle $salle, $start, $end, $day): bool
    {
        $tps = TimesTable::whereSalleId($salle->id)->whereDayId($day)->get();
        $test = true;
        if ($tps) {
            foreach ($tps as $value) {
                if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                    $test = false;
                    break;
                }
            }
        }
        return $test;
    }

    public function currentUser()
    {
        return User::find(auth()->id());
    }

    private function getDateFromDayNumber($day_number)
    {
        // Obtient la date actuelle
        $current_date = new DateTime();

        // Obtient le numéro du jour de la semaine actuel (1 pour lundi, 7 pour dimanche)
        $current_day = $current_date->format('N');

        // Calcule la différence entre le jour actuel et le day_number fourni
        $difference = $day_number - $current_day;

        // Ajoute la différence à la date actuelle
        $target_date = $current_date->modify("+$difference days");

        return $target_date;
    }

    public function getDateStartFromTimesTable($timesTable)
    {
        $target_date = $this->getDateFromDayNumber($timesTable->day->number);
        $start = $timesTable->start;

        $start_datetime = $target_date->format('Y-m-d') . ' ' . $start;
        return $start_datetime;
    }

    public function getDateEndFromTimesTable($timesTable)
    {
        $target_date = $this->getDateFromDayNumber($timesTable->day->number);
        $end = $timesTable->end;

        $end_datetime = $target_date->format('Y-m-d') . ' ' . $end;
        return $end_datetime;
    }
}
