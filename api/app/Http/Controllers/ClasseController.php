<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\User;
use App\Models\Classe;
use App\Models\TimesTable;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class ClasseController extends Controller
{
    public function __construct()
    {
        $this->middleware("permission:voir classe")->only(["index", "show"]);
        $this->middleware("permission:modifier classe")->only(["update"]);
        $this->middleware("permission:creer classe")->only(["store"]);
        $this->middleware("permission:supprimer classe")->only(["destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index()
    {
        return Departement::with('classes')->with('courses')->get();
    }

    public function select()
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return Classe::with("departement")->get();
        }
        return Classe::with("departement")->whereDepartementId($user->departement_id)->get();
    }

    public function findByDepartement($departement)
    {
        return Classe::with("courses")
            ->whereDepartementId($departement)
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "nb_students" => "required|numeric|min:0",
            "departement_id" => "required|exists:departements,id"
        ]);

        $classe = new Classe();
        $classe->name = $request->name;
        $classe->nb_students = $request->nb_students;
        $classe->departement_id = $request->departement_id;
        $classe->save();
        return response()->json($classe, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Classe
     */
    public function show($id)
    {
        return Classe::with(['departement', 'courses', 'courses.classe', 'professor'])->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Classe
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "nb_students" => "required|numeric|min:0",
            "departement_id" => "required|exists:departements,id"
        ]);

        DB::table('classes')->whereId($id)->update($request->all());
        return $this->show($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Classe::find($id)->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
