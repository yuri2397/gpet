<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UE extends Model
{
    use HasFactory;

    protected $fillable = ['*'];
    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
}
