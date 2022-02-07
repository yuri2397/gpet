<?php

namespace App\Http\Controllers;

use App\Models\EC;
use App\Models\UE;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ECController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir ec")->only(["index", "show"]);
        $this->middleware("permission:modifier ec")->only(["update"]);
        $this->middleware("permission:creer ec")->only(["store"]);
        $this->middleware("permission:supprimer ec")->only(["destroy"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JSONResponse
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
     * @return \Illuminate\Http\JSONResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required',
            "name" => 'required',
            'ue_id' => 'required',
            "ue_code" => "string",
            "ue_name" => "string",
            "departement_id" => "numeric",
            "vht" => "required",
            "semester_id" => "exists:semesters,id"
        ]);

        $ec = new EC();
        $ec->name = $request->name;
        $ec->code = $request->code;
        $ec->vht = $request->vht;

        if ($request->ue_id == -1) {
            $ue = new UE();
            $ue->name = $request->ue_name;
            $ue->code = $request->ue_code;
            $ue->departement_id = $request->departement_id;
            $ue->semester_id = $request->semester_id;
            $ue->save();
            $ec->ue_id = $ue->id;
            $ec->save();
        }
        else {
            $ec->ue_id = $request->ue_id;
            $ec->save();
        }

        return response()->json($ec, 200);
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
     * @return \Illuminate\Http\JSONResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|exists:e_c_s,code',
            "name" => 'required',
            "vht" => "required|numeric"
        ]);

        EC::whereId($id)->update($request->all());
        $ec = EC::find($id);
        $courses = Course::whereEcId($ec->id)->get();
        foreach ($courses as $value) {
            $value->hours = $ec->vht;
            $value->save();
        }
        return $ec;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JSONResponse
     */
    public function destroy($id)
    {
        $courses = Course::whereEcId($id)->first();

        if (!$courses) {
            return response()->json(EC::find($id)->delete());
        }

        return response()->json([
            "message" => "Le EC est lien au cours de : '" . $courses->name . "'."
        ]);

    }

    public function search($data)
    {
        return EC::where('name', 'like', '%' . $data . '%')
            ->orWhere('code', 'like', '%' . $data . '%')
            ->get();
    }
}
