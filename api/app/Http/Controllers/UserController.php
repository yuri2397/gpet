<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
   
    public function index()
    {
        $user = User::find(auth()->id());
        if($user->hasRole("chef de département")){
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
            "roles" => "required|exists:roles,name",
        ]);

        $user = new User;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->departement_id = $request->departement_id;
        $user->password = bcrypt("bienvenue");
        $user->save();
        $user->assignRole($request->roles);
        return response()->json(['message' => "Utilisateur crée avec succès."], 200);
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
        return DB::table("users")->wereId($id)->delete();
    }
}
