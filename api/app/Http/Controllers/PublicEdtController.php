<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Classe;
use App\Models\TimesTable;
use App\Models\Departement;
use Illuminate\Http\Request;

class PublicEdtController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = TimesTable::with($request->with ?? []);
    }

    public function departements(Request $request)
    {
        $query = Departement::with($request->with ?? []);

        if ($request->has('search'))
            $query->where('name', 'like', '%' . $request->search . '%');

        return $query->get();
    }

    public function departementClasses()
    {
        $query = Classe::all();

        // inject edt controller
        $all = [];

        foreach ($query as $value) {
            $all[] = [
                "classe" => $value,
                "edt" => $this->classEdp($value->id)
            ];
        }

        return $all;
    }

    public function classEdp($id)
    {
        $ept = [];

        $days = Day::all();

        foreach ($days as $day) {
            $ept[] = [
                "day" => $day,
                "data" => TimesTable::whereClasseId($id)
                    ->whereDayId($day->id)
                    ->orderBy("start")
                    ->get()
            ];
        }

        return $ept;
    }
}
