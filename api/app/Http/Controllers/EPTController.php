<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Course;
use App\Models\Day;
use App\Models\TimesTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EPTController extends Controller
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "start" => "required|date",
            "end" => "required|date",
            "classe_id" => "required|exists:classes,id",
            "salle_id" => "exists:salles,id",
            "course_id" => "required|exists:courses,id",
            "day_id" => "required|exists:days,id"
        ]);

        $course = Course::find($request->course_id);
        if($course->professor == null){
            return response()->json([
                "message" => "Ce cour n'a pas de professeur pour le faire."
            ], 400);
        }
        $ept = new TimesTable();
        $ept->start = date("H:i", strtotime($request->start));
        $ept->end = date("H:i", strtotime($request->end));
        $ept->classe_id = $request->classe_id;
        $ept->course_id = $request->course_id;
        $ept->professor_id = $course->professor->id;
        $ept->salle_id = $request->salle_id;
        $ept->day_id = $request->day_id;
        $ept->save();


        return response()->json(TimesTable::find($ept->id), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ept = [];

        $days = Day::all();

        foreach ($days as $day) {
            $ept[] = [ "day" => $day, "data" => TimesTable::whereClasseId($id)->whereDayId($day->id)->get()];
        }

        return $ept;
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
    public function destroy($ept)
    {
        return TimesTable::find($ept)->delete();
    }
}
