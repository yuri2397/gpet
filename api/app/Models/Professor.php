<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Professor extends Model
{
    use HasFactory;

    /**
     * Get the account associated with the user.
     */
    public function account()
    {
        return $this->hasOne(Account::class);
    }

    public function departement()
    {
        return $this->hasOne(Departement::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function coursesDo()
    {
        return $this->hasMany(CoursesHasProfessors::class);
    }
}
