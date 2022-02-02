<?php

namespace App\Traits;

use Illuminate\Http\Request;


trait Utils
{
    protected $userProfilPath = "user-profile";
    public function hourEmbedHour($start, $end, $emdStart, $emdEnd)
    {
        if (
        ($start == $emdStart && $end == $emdEnd)
        ||
        ($start >= $emdStart && $end <= $emdEnd)
        ||
        ($emdStart >= $start && $emdEnd >= $end)
        ||
        ($start >= $emdStart && $end >= $emdEnd)
        ||
        ($emdStart >= $start && $end <= $emdEnd)
        ) {
            return true;
        }
        return false;
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
