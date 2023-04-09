<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;
    protected $fillable = ['*'];
    protected $appends = ['classes_count', 'professors_count', 'courses_count'];
        

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function classesLibre()
    {
        return $this->hasMany(ClasseLibre::class);
    }

    public function professors()
    {
        return $this->hasMany(Professor::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function getClassesCountAttribute()
    {
        return $this->classes()->count();
    }

    public function getProfessorsCountAttribute()
    {
        return $this->professors()->count();
    }

    public function getCoursesCountAttribute()
    {
        return $this->courses()->count();
    }
}
