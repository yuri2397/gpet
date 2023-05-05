<?php

namespace App\Http\Controllers;

use App\Models\PublicEvent;
use Illuminate\Http\Request;

class PublicEventController extends Controller
{
    public function index(Request $request)
    {
        return PublicEvent::where('start', '>=', $request->start)
            ->where('end', '<=', $request->end)->get();
    }

    public function show(Request $request, $id)
    {
        return PublicEvent::find($id);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'title' => 'required',
                'summary' => 'required',
                'start' => 'required',
                'end' => 'required',
                'type' => 'required',
            ]
        );

        $event = new PublicEvent();
        $event->title = $request->title;
        $event->summary = $request->summary;
        $event->innerContent = $request->innerContent;
        $event->start = date('Y-m-d H:i:s', strtotime($request->start));
        $event->end = date('Y-m-d H:i:s', strtotime($request->end));
        $event->logo = $request->logo;
        $event->scrollable = $request->scrollable;
        $event->fullscreen = $request->fullscreen;
        $event->allDay = $request->allDay;
        $event->scrollTime = $request->scrollTime;
        $event->type = $request->type;
        $event->save();

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'event' => $event
        ]);

    }

    public function update(Request $request, $id)
    {
        // update if field is not empty or null
        $event = PublicEvent::find($id);
        $event->title = $request->title ?? $event->title;
        $event->summary = $request->summary ?? $event->summary;
        $event->innerContent = $request->innerContent ?? $event->innerContent;
        $event->start = date('Y-m-d H:i:s', strtotime($request->start)) ?? $event->start;
        $event->end = date('Y-m-d H:i:s', strtotime($request->end)) ?? $event->end;
        $event->logo = $request->logo ?? $event->logo;
        $event->scrollable = $request->scrollable ?? $event->scrollable;
        $event->fullscreen = $request->fullscreen ?? $event->fullscreen;
        $event->allDay = $request->allDay ?? $event->allDay;
        $event->scrollTime = $request->scrollTime ?? $event->scrollTime;
        $event->type = $request->type ?? $event->type;
        $event->save();

        return response()->json([
            'success' => true,
            'message' => 'Event updated successfully',
            'event' => $event
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $event = PublicEvent::find($id);
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully',
            'event' => $event
        ]);
    }
}
