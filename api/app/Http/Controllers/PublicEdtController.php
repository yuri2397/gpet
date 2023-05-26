<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Classe;
use App\Models\TimesTable;
use App\Models\Departement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

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

    public function storeImage(Request $request)
    {
        if($request->file('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            return response()->json([
                "success" => true,
                "message" => "Image uploaded successfully",
                "image" => URL::to('/') . "/images/" . $imageName
            ]);
        }
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

    public function publicEDT()
    {

        return view('public')->with([
            // "all" => $this->departementClasses(),
            // "days" => [
            //     ['id' => 1, "name" => "Lundi"],
            //     ['id' => 2, "name" => "Mardi"],
            //     ['id' => 3, "name" => "Mercredi"],
            //     ['id' => 4, "name" => "Jeudi"],
            //     ['id' => 5, "name" => "Vendredi"],
            //     ['id' => 6, "name" => "Samedi"]
            //]

            "images" => ["http://127.0.0.1:8000/images/1682379814.jpg", "http://localhost:8000/images/1682379685.jpg"]
        ]);
    }
}
