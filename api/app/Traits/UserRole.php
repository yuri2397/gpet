<?php

namespace App\Traits;

use App\Models\User;

trait UserRole
{
    function isAdmin(User $user)
    {
        return $user->hasRole("super admin") ? true : false;
    }
}
