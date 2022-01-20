<?php

namespace App\Http\Controllers;

use App\Models\EC;
use App\Models\UE;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SemesterController extends Controller
{
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    //
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
