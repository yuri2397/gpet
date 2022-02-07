<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;
    protected $fillable = ['*'];
    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function professors()
    {
        return $this->hasMany(Professor::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
