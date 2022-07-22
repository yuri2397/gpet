<?php

namespace App\Http\Controllers;

use UserRole;
use App\Models\User;
use App\Models\Batiment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class BatimentController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir batiment")->only(["index", "show"]);
        $this->middleware("permission:modifier batiment")->only(["update"]);
        $this->middleware("permission:creer batiment")->only(["store"]);
        $this->middleware("permission:supprimer batiment")->only(["destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Batiment::orderBy('created_at', 'desc')->get();
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
            'name' => 'required'
        ]);

        $bat = new Batiment;

        $bat->name = $request->name;
        $bat->save();
        return $bat;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Batiment::find($id);
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
        $this->validate($request, ['name' => 'required']);
        $bat = Batiment::find($id);
        if ($bat == null) return response()->json(['message' => 'Batiment introuvable.'], 404);
        $bat->name = $request->name;
        $bat->save();
        return response()->json($bat, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('batiments')->whereId($id)->delete();
        return response()->json([], 200);
    }
}
