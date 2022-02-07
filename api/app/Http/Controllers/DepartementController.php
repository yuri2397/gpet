<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Course;
use App\Models\Professor;
use App\Models\Batiment;
use App\Models\Salle;
use App\Models\Classe;

class DepartementController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir departement")->only(["index", "show"]);
        $this->middleware("permission:modifier departement")->only(["update"]);
        $this->middleware("permission:creer departement")->only(["store"]);
        $this->middleware("permission:supprimer departement")->only(["destroy"]);
    }

    public function index()
    {
        return Departement::with('classes')->orderBy('created_at', 'desc')->get();
    }


    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required']);
        $dep = new Departement();
        $dep->name = $request->name;
        $dep->save();
        return response()->json($dep, 200);
    }


    public function show($id)
    {
        return Departement::with('professors')
            ->with('classes')
            ->with('courses')
            ->with("courses.classe")
            ->with('courses.departement')
            ->whereId($id)
            ->first();
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, ['name' => 'required']);
        $dep = Departement::find($id);
        if ($dep == null)
            return response()->json(['message' => 'Département introuvable'], 404);
        $dep->name = $request->name;
        $dep->save();
        return response()->json($dep, 200);
    }


    public function destroy($id)
    {
        return response()->json(DB::table("departements")->whereId($id)->delete(), 200);
    }


    public function dashboard()
    {
        $user = User::find(auth()->id());
        if($user->hasRole("super admin")){
            return response()->json([
                "courses" => count(Course::all()),
                "professors" => count(Professor::all()),
                "classes" => count(Classe::all()),
                "salles" => count(Salle::all())
            ]);
        }
        $departement = Departement::find($user->departement_id);

        return response()->json([
            "courses" => count(Course::whereDepartementId($departement->id)->get()),
            "professors" => count(Professor::whereDepartementId($departement->id)->get()),
            "classes" => count(Classe::whereDepartementId($departement->id)->get()),
            "salles" => count(Salle::whereDepartementId($departement->id)->get())
        ]);
    }
}
