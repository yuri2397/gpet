<?php

namespace App\Http\Controllers;

use App\Models\EC;
use App\Models\UE;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SemesterController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir semestre")->only(["index", "show"]);
        $this->middleware("permission:modifier semestre")->only(["update"]);
        $this->middleware("permission:creer semestre")->only(["store"]);
        $this->middleware("permission:supprimer semestre")->only(["destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    //
    }

    
    public function store(Request $request)
    {
        $this->validate($request, [
            "name" => "required",
            "departement_id" => "required|exists:departements,id"
        ]);

        $semester = new Semester;
        $semester->name = $request->name;
        $semester->departement_id = $request->departement_id;
        $semester->save();
        return $semester;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Semester::find($id);
    }

    
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required"
        ]);
        $semester = Semester::find($id);
        $semester->name = $request->name;
        $semester->save();

        return response()->json($semester);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    //
    }


    public function findByDepartement($departement)
    {
        $result = Semester::with(["ues", "ues.ecs"])
            ->whereDepartementId($departement)
            ->get();

        return $result;
    }
}
