<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Salle;
use App\Traits\Utils;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Professor;
use App\Models\TimesTable;
use App\Models\Departement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Response as HttpResponse;

class EPTController extends Controller
{
    use Utils;

    public function __construct()
    {
        $this->middleware("permission:modifier edt")->only(["update"]);
        $this->middleware("permission:creer edt")->only(["store"]);
        $this->middleware("permission:supprimer edt")->only(["destroy"]);
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
            "course_id" => "required|exists:courses,id",
            "day_id" => "required|exists:days,id",
        ]);

        $start = date("H:i", strtotime($request->start));
        $end = date("H:i", strtotime($request->end));

        if ($start >= $end) {
            return response()->json([
                "message" => "Le cour ne peux pas terminé avant d'avoir commencé."
            ], HttpResponse::HTTP_CONFLICT);
        }
        $course = Course::find($request->course_id);
        if ($course->professor == null) {
            return response()->json([
                "message" => "Ce cour n'a pas de professeur pour le faire."
            ], 400);
        }

        return $this->validateETP($request, $course, false);
    }

    private function validateETP(Request $request, Course $course, $update = false)
    {
        $start = date("H:i", strtotime($request->start));
        $end = date("H:i", strtotime($request->end));
        $day = Day::find($request->day_id);
        $classe = Classe::find($request->classe_id ?? 0);
        $professor = Professor::find($course->professor->id);
        $salle = Salle::find($request->salle_id);

        $eptForProfessor = TimesTable::whereProfessorId($professor->id)->whereDayId($day->id)->get();
        // si le prof est dispo
        foreach ($eptForProfessor as $value) {
            if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                if ($update && $value->id == $request->ept_id) {
                    break;
                }
                return response()->json([
                    "message" => "Le professeur est occupé le " . Str::upper($day->name) . " à " . $value->start . " À " . $value->end
                ], HttpResponse::HTTP_CONFLICT);
            }
        }
        $eptForDay = TimesTable::whereClasseId($classe->id)->whereDayId($day->id)->get();
        // si la classe sera dispo
        foreach ($eptForDay as $key => $value) {
            if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                if ($update && $value->id == $request->ept_id) {
                    break;
                }
                $c = Course::find($value->course_id);
                return response()->json([
                    "message" => "Un cour de  " . Str::upper($c->name) . " est programmé pour la classe, le" . Str::upper($day->name) . " de " . $value->start . " À " . $value->end
                ], HttpResponse::HTTP_CONFLICT);
            }
        }
        if ($salle) {
            $eptForSalle = TimesTable::whereSalleId($salle->id)->whereDayId($day->id)->get();
            // si la salle serra dispo
            foreach ($eptForSalle as $key => $value) {
                if ($this->hourEmbedHour($start, $end, $value->start, $value->end)) {
                    if ($update && $value->id == $request->ept_id) {
                        break;
                    }
                    $s = Salle::find($value->salle_id);
                    return response()->json([
                        "message" => "La salle " . Str::upper($s->name) . " est déjà reservée pour le " . Str::upper($day->name) . " de " . $value->start . " À " . $value->end . " pour le cour de " . Str::upper(Course::find($value->course_id)->name) . " avec la classe: " . Str::upper(Classe::find($value->classe_id)->name)
                    ], HttpResponse::HTTP_CONFLICT);
                }
            }
        }
        if (!$update) {
            $ept = new TimesTable();
            $ept->start = date("H:i", strtotime($request->start));
            $ept->end = date("H:i", strtotime($request->end));
            $ept->classe_id = $request->classe_id;
            $ept->course_id = $request->course_id;
            $ept->professor_id = $course->professor->id;
            $ept->salle_id = $request->salle_id;
            $ept->day_id = $request->day_id;
            $ept->group = $request->group ?? '1';
            $ept->save();
        } else {
            $ept = TimesTable::find($request->ept_id);
            $ept->start = date("H:i", strtotime($request->start));
            $ept->end = date("H:i", strtotime($request->end));
            $ept->classe_id = $request->classe_id;
            $ept->course_id = $request->course_id;
            $ept->professor_id = $course->professor->id;
            $ept->salle_id = $request->salle_id;
            $ept->day_id = $request->day_id;
            $ept->group = $request->group ?? '1';
            $ept->save();
        }
        return response()->json(TimesTable::find($ept->id), 200);
    }


    public function serviceWebEPT($departement_name, $classe_name)
    {

        $classe = Classe::whereName($classe_name)->first();
        if ($classe != null) {
            return view("ept")->with([
                "ept" => $this->show($classe->id),
                "classe" => $classe->name,
                "departement" => $departement_name
            ]);
        } else {
            return view("ept404");
        }
    }


    public function show($id)
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

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "start" => "required|date",
            "end" => "required|date",
            "classe_id" => "required|exists:classes,id",
            "course_id" => "required|exists:courses,id",
            "day_id" => "required|exists:days,id",
            "ept_id" => 'required|exists:times_tables,id'
        ]);
        $start = date("H:i", strtotime($request->start));
        $end = date("H:i", strtotime($request->end));

        if ($start >= $end) {
            return response()->json([
                "message" => "Le cour ne peux pas terminé avant d'avoir commencé."
            ], HttpResponse::HTTP_CONFLICT);
        }
        $course = Course::find($request->course_id);
        if ($course->professor == null) {
            return response()->json([
                "message" => "Ce cour n'a pas de professeur pour le faire."
            ], 400);
        }

        return $this->validateETP($request, $course, true);
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
