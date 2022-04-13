<?php

namespace App\Http\Controllers;

use App\Models\Syllabus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SyllabusController extends Controller
{

    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->isAdmin()) {
            return Syllabus::with(['courses'])->orderBy('created_at', 'desc')->get();
        } else {
            return Syllabus::with(['courses'])->whereCourseId($user->course_id)->orderBy('created_at');
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'description' => 'required',
            "course_id" => 'required|exists:courses,id|unique:syllabus,course_id'
        ]);
        $syllabus = new Syllabus();
        $syllabus->description = $request->description;
        $syllabus->course_id = $request->course_id;
        $syllabus->save();
        return response()->json($syllabus, 200);
    }


    public function show($id)
    {
        return Syllabus::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'description' => 'required',
            "course_id" => 'required|exists:courses,id|unique:syllabus,course_id'
        ]);
        DB::table('syllabus')->whereId($id)->update($request->all());
        return $this->show($id);
    }

    public function destroy($id)
    {
        return response()->json(DB::table('syllabus')->whereId($id)->delete(), 200);
    }

    public function search($data)
    {
        //
    }
}
