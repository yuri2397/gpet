<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $with = ['professor', 'ec', 'service', 'semester', 'departement', "syllabus", "media"];
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

    public function syllabus()
    {
        return $this->hasOne(Syllabus::class);
    }
}
