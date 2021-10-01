<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoursesHasProfessors extends Model
{
    use HasFactory;
    protected $fillable = ['*'];
    protected $table = "courses_has_professors";

}
