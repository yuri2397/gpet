<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EC extends Model
{
    use HasFactory;

    protected $with = ['ue'];

    protected $fillables = ['*'];

    public function ue()
    {
        return $this->belongsTo(UE::class, 'ue_id');
    }
}
