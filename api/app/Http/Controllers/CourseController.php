<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

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
            return Course::orderBy('created_at', 'desc')->get();
        }
        return Course::whereDerpartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
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
            "classe_id" => "required|exists:classes,id",
            "semester_id" => "required|exists:semesters,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id"
        ]);

        $course = new Course;
        $course->acronym = $request->acronym;
        $course->name = $request->name;
        $course->classe_id = $request->classe_id;
        $course->groupe_number = $request->groupe_number;
        $course->semester_id = $request->semester_id;
        $course->service_id = $request->service_id;
        $course->ec_id = $request->ec_id;
        $course->professor_id = $request->professor_id;
        $course->save();

        return $course;
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
        $cour->professor;
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
            "acronym" => 'required|unique:courses,acronym',
            "name" => "required",
            "groupe_number" => 'required',
            "classe_id" => "required|exists:classes,id",
            "semester_id" => "required|exists:semesters,id",
            "service_id" => "required|exists:services,id",
            "ec_id" => "required|exists:e_c_s,id"
        ]);

        Course::find($id)->update($request->all());

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

}
