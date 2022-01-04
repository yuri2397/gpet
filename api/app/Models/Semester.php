<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    use HasFactory;
    protected $fillable = ['*'];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function ues()
    {
        return $this->hasMany(UE::class);
    }
}
