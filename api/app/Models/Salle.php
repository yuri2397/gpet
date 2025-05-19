<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;
    protected $fillable = ['*'];

    public function batiment()
    {
        return $this->belongsTo(Batiment::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    // get courses for salle join times_tables (course_id, salle_id)
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'times_tables');
    }

    // get the classe for salle join times_tables (classe_id, salle_id)

    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'times_tables');
    }

    public function times_tables()
    {
        return $this->hasMany(TimesTable::class);
    }
}
