<?php

namespace App\Traits;

use Illuminate\Http\Request;


trait Utils
{
    protected $userProfilPath = "user-profile";
    public function hourEmbedHour($start, $end, $emdStart, $emdEnd)
    {
        // $start = 15:00, $end = 18:00
        // $emdStart = 8:00, $emdEnd = 12:00
        if (
        ($start < $emdStart && $end <= $emdStart) || ($start >= $emdStart && $end > $emdStart)
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
}
