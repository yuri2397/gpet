<?php

namespace App\Http\Controllers;

use App\Models\EC;
use App\Models\UE;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ECController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return EC::orderBy('created_at', 'desc')->get();
        }
        $ues = UE::whereDepartementId($user->departement_id)->get()->pluck('id');
        return EC::whereIn('ue_id', $ues)->get();
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
            'code' => 'required|unique:e_c_s,code',
            "name" => 'required',
            'ue_id' => 'required',
            "ue_code" => "string",
            "ue_name" => "string",
            "departement_id" => "numeric"
        ]);

        $ec = new EC();
        $ec->name = $request->name;
        $ec->code = $request->code;

        if ($request->ue_id == -1) {
            $ue = new UE();
            $ue->name = $request->ue_name;
            $ue->code = $request->ue_code;
            $ue->departement_id = $request->departement_id;
            $ue->save();
            $ec->ue_id = $ue->id;
            $ec->save();
        } else {
            $ec->ue_id = $request->ue_id;
            $ec->save();
        }

        return response()->json($ec);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return EC::find($id);
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
            'code' => 'required|exists:e_c_s,code',
            "name" => 'required'
        ]);

        return EC::whereId($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return EC::whereId($id)->delete();
    }

    public function search($data)
    {
        return EC::where('name', 'like', '%' . $data . '%')
            ->orWhere('code', 'like', '%' . $data . '%')
            ->get();
    }
}
