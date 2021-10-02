<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoursesHasProfessors extends Model
{
    use HasFactory;
    protected $fillable = ['*'];

    protected $with = ['professor','course'];

    protected $table = "courses_has_professors";

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

}
