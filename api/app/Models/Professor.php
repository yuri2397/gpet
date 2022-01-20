<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Professor extends Model
{
    use HasFactory;
    protected $fillable = ['*'];
    protected $with = ["professorType"];
    /**
     * Get the account associated with the user.
     */
    public function account()
    {
        return $this->hasOne(Account::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function coursesDo()
    {
        return $this->hasMany(CoursesHasProfessors::class);
    }

    public function professorType()
    {
        return $this->belongsTo(ProfessorType::class);
    }
}
