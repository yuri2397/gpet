<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    public string $guard_name = 'api';

    protected $fillable = ['*'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected $with = ['departement', 'permissions', 'roles'];

    public function isAdmin(): bool
    {
        return $this->hasRole('super admin');
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class, 'model');
    }
}
