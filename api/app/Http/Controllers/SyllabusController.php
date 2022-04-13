<?php

namespace App\Http\Controllers;

use App\Models\Syllabus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SyllabusController extends Controller
{
    public function __construct() {
        $this->middleware("permission:creer syllabus")->only(["store"]);
    }

    public function index()
    {
        $user = User::find(auth()->id());
        if($user->isAdmin()) {
            return Syllabus::with(['course'])->orderBy('created_at','description')->get();
        }else{
            return Syllabus::with(['course'])->whereCourseId($user->course_id)->orderBy('created_at');
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'description' => 'required|text',
            "course_id" => 'required|exists:course,id'
        ]);
        $syllabus= new Syllabus();
        $syllabus->description = $request->description ?? null;
        $syllabus->course_id = $request->course_id;
        $syllabus->save();
        return $syllabus;
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request,$id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function search($data)
    {
        //
    }
}
