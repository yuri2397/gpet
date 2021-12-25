<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CoursesHasProfessors;

class CourseController extends Controller
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
            return Course::with('classe')->with('departement')->orderBy('created_at', 'desc')->get();
        }
        return Course::with('classe')->with('departement')->whereDepartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
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
            "acronym" => 'required|unique:courses,acronym',
            "name" => "required",
            "groupe_number" => 'required',
            "hours" => 'required',
            "classe_id" => "required|exists:classes,id",
            "semester_id" => "required|exists:semesters,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id",
            "departement_id" => 'required|exists:departements,id'
        ]);

        $course = new Course;
        $course->acronym = $request->acronym;
        $course->name = $request->name;
        $course->hours = $request->hours;
        $course->classe_id = $request->classe_id;
        $course->groupe_number = $request->groupe_number;
        $course->semester_id = $request->semester_id;
        $course->departement_id = $request->departement_id;
        $course->service_id = $request->service_id;
        $course->ec_id = $request->ec_id;
        $course->professor_id = $request->professor_id ?? null;
        $course->save();

        return $this->show($course->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cour = Course::find($id);
        return $cour;
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
            "acronym" => 'required|exists:courses,acronym',
            "name" => "required",
            "hours" => 'required',
            "groupe_number" => 'required',
            "classe_id" => "required|exists:classes,id",
            "semester_id" => "required|exists:semesters,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id"
        ]);

        DB::table('courses')->whereId($id)->update($request->all());

        return $this->show($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
        } else {
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

        $couresDo = CoursesHasProfessors::whereCourseId($request->course_id)
            ->whereProfessorId($request->professor_id)
            ->whereIsPaid(0)
            ->get();
        collect($couresDo)->map(function ($c) {
            $c->is_paid = true;
            $c->save();
        });

        return response()->json([
            "message" => "Paiements effectué avec succès."
        ], 200);
    }
}
