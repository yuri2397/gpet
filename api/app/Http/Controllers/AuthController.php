<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "password" => "required"
        ]);

        $user = User::with("roles", "roles.permissions")->where('email', $request->email)->first();

        if ($user != null && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Admin Password Grant Client')->accessToken;
            return response()->json([
                'token' => $token,
                'user' => $user,
                'permissions' => $user->permissions,
                'departement' => $user->departement
            ], 200);
        } else {
            $response = ["message" => "Email ou mot de password incorrect."];
            return response($response, 400);
        }
    }

    public function user()
    {
        $user = User::with("roles", "roles.permissions")->find(auth()->id());
        return $user;
    }
}
