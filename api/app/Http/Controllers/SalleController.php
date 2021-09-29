<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table("salles as S")
            ->join('departements as D', 'S.departement_id', 'D.id')
            ->join('batiments as B', 'S.batiment_id', 'B.id')
            ->select('S.*', 'D.name as departement', 'B.name as batiment')
            ->orderBy('S.created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'number' => 'required|numeric',
            'name' => 'string',
            "capacity" => 'required|numeric',
            "batiment_id" => 'required|exists:batiments,id',
            'departement_id' => 'required|exists:departements,id'
        ]);

        $dept = new Salle();
        $dept->name = $request->name ?? null;
        $dept->number = $request->number;
        $dept->capacity = $request->capacity;
        $dept->batiment_id = $request->batiment_id;
        $dept->departement_id = $request->departement_id;
        $dept->save();
        return response()->json($dept, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table("salles as S")
            ->where("S.id",$id)
            ->join('departements as D', 'S.departement_id', 'D.id')
            ->join('batiments as B', 'S.batiment_id', 'B.id')
            ->select('S.*', 'D.name as departement', 'B.name as batiment')
            ->orderBy('S.created_at', 'desc')
            ->first();
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
        $this->validate($request, [
            'number' => 'required|numeric',
            "capacity" => 'required|numeric',
            "batiment_id" => 'required|exists:batiments,id',
            'departement_id' => 'required|exists:departements,id'
        ]);
        DB::table('salles')->whereId($id)->update($request->all());
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
        return response()->json(DB::table("salles")->whereId($id)->delete(), 200);
    }
}
