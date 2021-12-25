<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimesTable extends Model
{
    use HasFactory;

    protected $with = ['day','salle', 'course'];

    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function professor(){
        return $this->belongsTo(Professor::class);
    }

    public function salle(){
        return $this->belongsTo(Salle::class);
    }

    public function classe(){
        return $this->belongsTo(Classe::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
