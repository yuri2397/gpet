<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $with = ['professor', 'ec', 'service', 'semester', 'departement', "syllabus"];
    protected $fillable = ['*'];

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function ec()
    {
        return $this->belongsTo(EC::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function syllabus(){
        return $this->hasOne(Syllabus::class);
    }
}
