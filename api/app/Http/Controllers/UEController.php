<?php

namespace App\Http\Controllers;

use App\Models\EC;
use App\Models\UE;
use App\Models\User;
use Illuminate\Http\Request;

class UEController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir ue")->only(["index", "show"]);
        $this->middleware("permission:modifier ue")->only(["update"]);
        $this->middleware("permission:creer ue")->only(["store"]);
        $this->middleware("permission:supprimer ue")->only(["destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return UE::orderBy('created_at', 'desc')->get();
        }
        return UE::whereDepartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
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
            'code' => 'required|unique:u_e_s,code',
            "name" => 'required'
        ]);

        return UE::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return UE::find($id);
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
            'code' => 'required',
            "name" => 'required'
        ]);

        return UE::whereId($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return mixed
     */
    public function destroy($id)
    {
        $test = EC::where("ue_id", $id)->get()->count();
        if ($test == 0) {
            return UE::whereId($id)->delete();
        }
        return response()->json([
            "message" => "Impossible de supprimer un UE qui est attaché à des EC. Merci de supprimer les EC avant."
        ], 409);
    }

    public function search($data)
    {
        return UE::with('departement')
            ->where('name', 'like', '%' . $data . '%')
            ->orWhere('code', 'like', '%' . $data . '%')
            ->get();
    }
}
