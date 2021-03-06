<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = ['*'];

    protected $with = ['departement'];

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function professors(){
        return $this->hasManyThrough(Professor::class, Course::class);
    }
}
