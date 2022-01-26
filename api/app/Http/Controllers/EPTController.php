<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Salle;
use App\Traits\Utils;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Professor;
use App\Models\TimesTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Response as HttpResponse;
use App\Models\Departement;

class EPTController extends Controller
{
    use Utils;

    public function __construct()
    {
        $this->middleware("permission:modifier ept")->only(["update"]);
        $this->middleware("permission:creer ept")->only(["store"]);
        $this->middleware("permission:supprimer ept")->only(["destroy"]);
    }

    public function index()
    {
    //
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "start" => "required|date",
            "end" => "required|date",
            "classe_id" => "required|exists:classes,id",
            "salle_id" => "required|exists:salles,id",
            "course_id" => "required|exists:courses,id",
            "day_id" => "required|exists:days,id"
        ]);

        $start = date("H:i", strtotime($request->start));
        $end = date("H:i", strtotime($request->end));

        if ($start >= $end) {
            return response()->json([
                "message" => "Le cour ne peux pas terminé avant d'avoir commené."
            ], HttpResponse::HTTP_CONFLICT);
        }
        $course = Course::find($request->course_id);
        if ($course->professor == null) {
            return response()->json([
                "message" => "Ce cour n'a pas de professeur pour le faire."
            ], 400);
        }

        return $this->validateETP($request, $course);
    }

    private function validateETP(Request $request, Course $course)
    {
        $start = date("H:i", strtotime($request->start));
        $end = date("H:i", strtotime($request->end));
        $day = Day::find($request->day_id);
        $classe = Classe::find($request->classe_id);
        $professor = Professor::find($course->professor->id);
        $salle = Salle::find($request->salle_id);

        $eptForDay = TimesTable::whereClasseId($classe->id)->whereDayId($day->id)->get();

        $eptForProfessor = TimesTable::whereProfessorId($professor->id)->whereDayId($day->id)->get();

        $eptForSalle = TimesTable::whereSalleId($salle->id)->whereDayId($day->id)->get();

        // si le prof est dispo
        foreach ($eptForProfessor as $key => $value) {
            if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                return response()->json([
                    "message" => "Le professeur sera occupé le " . $day->name . " à " . $value->start . " À " . $value->end
                ], HttpResponse::HTTP_CONFLICT);
            }
        }

        // si la classe sera dispo
        foreach ($eptForDay as $key => $value) {
            if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                $c = Course::find($value->course_id);
                return response()->json([
                    "message" => "Un cour de  " . $c->name . " est programmé pour le" . $day->name . " de " . $value->start . " À " . $value->end
                ], HttpResponse::HTTP_CONFLICT);
            }
        }

        // si la salle serra dispo
        foreach ($eptForSalle as $key => $value) {
            if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                $s = Salle::find($value->salle_id);
                return response()->json([
                    "message" => "La salle " . $s->name ?? $s->number . " est déjà reservée pour le " . $day->name . " de " . $value->start . " À " . $value->end
                ], HttpResponse::HTTP_CONFLICT);
            }
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


    public function serviceWebEPT($departement_name, $classe_name)
    {
        $classe = Classe::whereName($classe_name)->first();
        if($classe != null){
            return view("ept")->with([
                "ept" => $this->show($classe->id),
                "classe" => $classe->name,
                "departement" => $departement_name
            ]);
        }
        else{
            return view("ept404");
        }
    }


    public function show($id)
    {
        $ept = [];

        $days = Day::all();

        foreach ($days as $day) {
            $ept[] = ["day" => $day, "data" => TimesTable::whereClasseId($id)->whereDayId($day->id)->get()];
        }

        return $ept;
    }

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
