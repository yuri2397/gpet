<?php

namespace App\Traits;
trait Utils
{

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
}
