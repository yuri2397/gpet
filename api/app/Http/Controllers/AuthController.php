<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function updatePassword(Request $request)
    {
        $this->validate($request, [
            "password" => "required",
            "new_password" => "required"
        ]);
        $user = User::find(auth()->id());
        if (Hash::check($request->password, $user->password)) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            return $user;
        }
        return  response()->json(["message" => "Votre mot de passe est incorrect"], 422);;
    }
}
