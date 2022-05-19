<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class RessourceController extends Controller
{
    //

    public function index()
    {
        //
    }


    public function create(Request $request)
    {
        //
    }


    public function store(Request $request)
    {
        //
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function search($data)
    {
    }



    public function uploadForCourse(Request $request, $course)
    {
        $course = Course::find($course);

        if ($request->hasFile('file')) {
            $course->addMultipleMediaFromRequest(['file'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection("course_ressource");
                });
        }

        return response()->json('Upload success', 200);
    }

    public function getUploadUrl($course)
    {
        return response()->json(URL::to("/") . "/api/ressource/upload-for-course/" . $course);
    }

    public function downloadMedia(Media $media)
    {
        return response()->download($media->getPath(), $media->file_name);
    }
}
