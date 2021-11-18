<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Departement::with('classes')->with('courses')->get();
    }

    public function findByDepartement($departement)
    {
        return Classe::whereDepartementId($departement)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Classe::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Classe::find($id)->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
