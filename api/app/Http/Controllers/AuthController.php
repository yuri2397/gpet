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
        $user = User::where('email', $request->email)->first();

        if ($user != null && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Admin Password Grant Client')->accessToken;
            return response()->json($token, 200);
        } else {
            $response = ["message" => "Email ou mot de password incorrect."];
            return response($response, 400);
        }
    }

    public function user()
    {
        $user = User::find(auth()->id());
        $user->roles->pluck('name')->all();
        return $user;
    }
}
