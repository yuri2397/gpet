<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UE extends Model
{
    use HasFactory;

    protected $fillable = ['*'];

    //protected $with = ['ecs'];

    public function ecs()
    {
        return $this->hasMany(EC::class, "ue_id");
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
