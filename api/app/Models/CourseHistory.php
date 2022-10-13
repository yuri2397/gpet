<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseHistory extends Model
{
    use HasFactory;

    protected $with = ["course", "status", "classe"];

    
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    
    public function status()
    {
        return $this->belongsTo(CourseStatus::class,"course_status_id");
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
    
    
}
