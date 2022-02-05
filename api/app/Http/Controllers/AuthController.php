<?php

namespace App\Http\Controllers;

use App\Mail\SendForgotPasswordMail;
use App\Models\PasswordResets;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
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
        return  response()->json(["message" => "Ancien mot de passe incorrect"], 422);
    }
    public function forgotPassword(Request $request)
    {
        # code...
        //dd($request);
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
        ]);
        $token = Str::random(6);
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => new DateTime(),
        ]);

        //SEND MAIL
        $user = User::whereEmail($request->email)->first();
        try {

            Mail::to($request->email)->send(new SendForgotPasswordMail($user, $token));
            return response()->json(['message' => "Code envoye avec succès."], 200);
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function resetPassword(Request $request)
    {
        # code...
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "code"  => "required|exists:password_resets,token",
            "password" => "required"
        ]);
        $user = User::whereEmail($request->email)->first();
        $token = DB::table('password_resets')->whereEmail($user->email)->whereToken($request->code)->first();
        //return $token;
        if ($token == null) {
            return  response()->json(["message" => "Votre code est invalide"], 422);
        } else {
            $user->password = Hash::make($request->password);
            $user->save();
            DB::table('password_resets')->whereEmail($user->email)->whereToken($request->code)->delete();
            return response()->json(['message' => "Mot de passe modifier avec success."], 200);
        }
    }
}
