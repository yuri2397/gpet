<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CoursesHasProfessors;
use App\Models\UE;
use App\Models\EC;

class CourseController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir cour")->only(["index", "show"]);
        $this->middleware("permission:modifier cour")->only(["update", "courseHasProfessor"]);
        $this->middleware("permission:creer cour")->only(["store"]);
        $this->middleware("permission:supprimer cour")->only(["destroy"]);
        $this->middleware("is_active")->only(["courseToProfessor"]);

    }

    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return Course::with('classe')->with('departement')->orderBy('created_at', 'desc')->get();
        }
        return Course::with('classe')->with('departement')->whereDepartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            "groupe_number" => 'required',
            "classe_id" => "required|exists:classes,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id",
            "departement_id" => 'required|exists:departements,id'
        ]);

        $ec = EC::with("ue")->find($request->ec_id);

        $course = new Course;
        $course->acronym = $ec->code;
        $course->name = $ec->name;
        $course->hours = $ec->vht;
        $course->classe_id = $request->classe_id;
        $course->groupe_number = $request->groupe_number;
        $course->semester_id = $ec->ue->semester_id;
        $course->departement_id = $request->departement_id;
        $course->service_id = $request->service_id;
        $course->ec_id = $request->ec_id;
        $course->professor_id = $request->professor_id ?? null;
        $course->save();

        return $this->show($course->id);
    }


    public function show($id)
    {
        $cour = Course::with("classe")->find($id);
        return $cour;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "groupe_number" => 'required',
            "classe_id" => "required|exists:classes,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id",
            "departement_id" => 'required|exists:departements,id'
        ]);

        $ec = EC::with("ue")->find($request->ec_id);

        DB::table('courses')->whereId($id)->update([
            "acronym" => $ec->code,
            "name" => $ec->name,
            "hours" => $ec->vht,
            "classe_id" => $request->classe_id,
            "groupe_number" => $request->groupe_number,
            "semester_id" => $ec->ue->semester_id,
            "departement_id" => $request->departement_id,
            "service_id" => $request->service_id,
            "ec_id" => $ec->id,
            "professor_id" => $request->professor_id ?? null,
        ]);

        return $this->show($id);
    }


    public function destroy($id)
    {
        return Course::find($id)->delete();
    }

    public function search($data)
    {
        return Course::with('classe')
            ->with('departement')
            ->where('name', 'like', '%' . $data . '%')
            ->orWhere('acronym', 'like', '%' . $data . '%')
            ->get();
    }

    public function courseHasProfessor(Request $request)
    {
        $request->validate([
            'hours' => 'required',
            'date' => 'required|date',
            'amount' => 'required',
            'course_id' => 'required|exists:courses,id',
            'professor_id' => 'required|exists:professors,id'
        ]);
        $chp = new CoursesHasProfessors();
        $chp->amount = $request->amount;
        $chp->date = $request->date;
        $chp->course_id = $request->course_id;
        $chp->professor_id = $request->professor_id;
        $chp->hours = $request->hours;
        $chp->save();

        return response()->json($chp, 200);
    }

    public function courseToProfessor(Request $request)
    {
        $request->validate([
            'professor_id' => 'required|exists:professors,id',
            'course_id' => 'required|exists:courses,id'
        ]);

        $course = Course::find($request->course_id);
        if ($course->professor_id == null) {
            $course->professor_id = $request->professor_id;
            $course->save();
            return response()->json($course, 200);
        }
        else {
            $cp = Professor::find($course->professor_id);
            return response()->json([
                'message' => 'Ce cour est affecté à ' . $cp->first_name . ' ' . $cp->last_name
            ], 404);
        }
    }

    public function removeCourseProfessor(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id'
        ]);
        $course = Course::find($request->course_id);
        $course->professor_id = null;
        $course->save();
        return response()->json($course, 200);
    }

    public function doPayment(Request $request)
    {
        $request->validate([
            "course_id" => "required|exists:courses,id",
            "professor_id" => "required|exists:professors,id",
            "total_sales" => "required",
            "total_hours" => "required",
            "amount_hour" => "required"
        ]);

        CoursesHasProfessors::whereCourseId($request->course_id)
            ->whereProfessorId($request->professor_id)
            ->whereIsPaid(0)
            ->update([
            "is_paid" => true
        ]);

        return response()->json([
            "message" => "Paiements effectué avec succès."
        ], 200);
    }

    public function listCoursesProfesor(Request $request)
    {
        # code...
        //pas encore ajouter sur la route api
        CoursesHasProfessors::whereCourseId($request->course_id)
        ->whereProfessorId($request->professor_id)->get();

    }
}
