<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\SendNewUserMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Traits\Utils;

class UserController extends Controller
{
    use Utils;
    public function __construct()
    {
        $this->middleware("permission:voir admin")->only(["index", "show"]);
        $this->middleware("permission:modifier admin")->only(["update"]);
        $this->middleware("permission:creer admin")->only(["store"]);
        $this->middleware("permission:supprimer admin")->only(["destroy"]);
    }

    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("chef de département")) {
            return User::with("roles")->whereDepartementId($user->departement_id)->get();
        }
        return User::with("roles")->get();
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            "first_name" => "required|min:2",
            "last_name" => "required|min:2",
            "email" => "required|email|unique:users,email",
            "departement_id" => 'required|exists:departements,id',
            "roles" => "required|array",
        ]);

        $user = new User;
        $password = Str::random("6");
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->departement_id = $request->departement_id;
        $user->password = bcrypt($password);

        //SEND MAIL
        try {
            Mail::to($user->email)->send(new SendNewUserMail($user, $password));
            $user->save();
            $user->assignRole($request->roles);
            return response()->json(['message' => "Utilisateur crée avec succès."], 200);
        } catch (\Throwable $th) {
            return response()->json(["Error" => $th, 'message' => "Service temporairement indisponible ou en maintenance.
            "], 503);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "first_name" => "required|min:2",
            "last_name" => "required|min:2",
            "email" => "required|email|exists:users,email",
            "roles" => "required|exists:roles,name",
        ]);
        $user = User::find($id);
        if ($user == null) {
            return response()->json(['message' => "Utilisateur n'existe pas.",], 404);
        }
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->save();
        $user->assignRole($request->roles);
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        return DB::table("users")->whereId($id)->delete();
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);


        $path = $request->file('file')->store('public/images');
        
        $user = User::find(auth()->id());
        if($user->avatar){
            \unlink($user->avatar);
        }
        $user->avatar = Str::substr($path, 6, strlen($path));
        
        $user->save();
        return response()->json($user);
    }
}
