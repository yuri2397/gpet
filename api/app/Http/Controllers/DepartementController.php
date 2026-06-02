<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Salle;
use App\Traits\Utils;
use App\Models\Classe;
use App\Models\Course;
use App\Models\Batiment;
use App\Models\Professor;
use App\Models\TimesTable;
use App\Models\Departement;
use App\Models\CourseStatus;
use App\Models\CoursesHasProfessors;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DepartementController extends Controller
{
    use Utils;
    public function __construct()
    {
        $this->middleware("permission:voir departement")->only(["index", "show"]);
        $this->middleware("permission:modifier departement")->only(["update"]);
        $this->middleware("permission:creer departement")->only(["store"]);
        $this->middleware("permission:supprimer departement")->only(["destroy"]);
    }

    public function index()
    {
        return Departement::withCount("classes")->orderBy('created_at', 'desc')->get();
    }


    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required']);
        $dep = new Departement();
        $dep->name = $request->name;
        $dep->save();
        return response()->json($dep, 200);
    }


    public function show($id)
    {
        return Departement::with('professors')
            ->with('classes')
            ->with('courses')
            ->with("courses.classe")
            ->with('courses.departement')
            ->whereId($id)
            ->first();
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, ['name' => 'required']);
        $dep = Departement::find($id);
        if ($dep == null)
            return response()->json(['message' => 'Département introuvable'], 404);
        $dep->name = $request->name;
        $dep->save();
        return response()->json($dep, 200);
    }


    public function destroy($id)
    {
        return response()->json(DB::table("departements")->whereId($id)->delete(), 200);
    }


    public function dashboard(Request $request)
    {
        $user = User::find(auth()->id());
        $isSuperAdmin = $user->hasRole("super admin");

        if ($request->has('departement')) {
            $param = $request->input('departement');
            $departementId = ($param === null || $param === '' || $param === 'null') ? null : (int) $param;
        } else {
            $departementId = $isSuperAdmin ? null : ($user->departement_id ?? null);
        }

        $showAll = $departementId === null;

        $courseQuery = $showAll ? Course::query() : Course::whereDepartementId($departementId);
        $professorQuery = $showAll ? Professor::query() : Professor::whereDepartementId($departementId);
        $classeQuery = $showAll ? Classe::query() : Classe::whereDepartementId($departementId);
        $salleQuery = $showAll ? Salle::query() : Salle::whereDepartementId($departementId);

        $coursesCount = (clone $courseQuery)->count();
        $professorsCount = (clone $professorQuery)->count();
        $classesCount = (clone $classeQuery)->count();
        $sallesCount = (clone $salleQuery)->count();

        $coursesUnassigned = (clone $courseQuery)->whereNull('professor_id')->count();
        $professorsActive = (clone $professorQuery)->where('is_active', true)->count();
        $professorsInactive = $professorsCount - $professorsActive;

        $courseIds = (clone $courseQuery)->pluck('id');

        $coursesByStatus = CourseStatus::orderBy('number', 'desc')
            ->get(['id', 'label', 'code'])
            ->map(function ($status) use ($courseIds, $showAll) {
                $q = Course::where('course_status_id', $status->id);
                if (!$showAll) $q->whereIn('id', $courseIds);
                return [
                    'label' => $status->label,
                    'code' => $status->code,
                    'count' => $q->count(),
                ];
            });

        $chpQuery = CoursesHasProfessors::query();
        if (!$showAll) $chpQuery->whereIn('course_id', $courseIds);

        $pendingPaymentsAmount = (clone $chpQuery)->where('is_paid', false)->sum('amount');
        $pendingPaymentsCount = (clone $chpQuery)->where('is_paid', false)->count();

        $sevenDaysAgo = Carbon::now()->subDays(6)->startOfDay();
        $weeklyRows = (clone $chpQuery)
            ->where('date', '>=', $sevenDaysAgo->toDateString())
            ->select('date', DB::raw('SUM(hours) as hours'))
            ->groupBy('date')
            ->pluck('hours', 'date');

        $weeklyHours = [];
        for ($i = 6; $i >= 0; $i--) {
            $d = Carbon::now()->subDays($i)->toDateString();
            $weeklyHours[] = [
                'date' => $d,
                'hours' => (int) ($weeklyRows[$d] ?? 0),
            ];
        }

        $topProfRows = (clone $chpQuery)
            ->select('professor_id', DB::raw('SUM(hours) as total_hours'), DB::raw('SUM(amount) as total_amount'))
            ->groupBy('professor_id')
            ->orderByDesc('total_hours')
            ->limit(5)
            ->get();

        $profIds = $topProfRows->pluck('professor_id');
        $profs = Professor::whereIn('id', $profIds)->get(['id', 'first_name', 'last_name', 'registration_number'])->keyBy('id');
        $topProfessors = $topProfRows->map(function ($row) use ($profs) {
            $p = $profs->get($row->professor_id);
            return [
                'id' => $row->professor_id,
                'first_name' => $p->first_name ?? null,
                'last_name' => $p->last_name ?? null,
                'registration_number' => $p->registration_number ?? null,
                'hours' => (int) $row->total_hours,
                'amount' => (int) $row->total_amount,
            ];
        });

        $salleIds = (clone $salleQuery)->pluck('id');
        $ttQuery = $showAll ? TimesTable::query() : TimesTable::whereIn('salle_id', $salleIds);

        $topSalleRows = (clone $ttQuery)
            ->select('salle_id', DB::raw('COUNT(*) as usage_count'))
            ->groupBy('salle_id')
            ->orderByDesc('usage_count')
            ->limit(5)
            ->get();

        $salleMap = Salle::whereIn('id', $topSalleRows->pluck('salle_id'))->get(['id', 'name', 'number'])->keyBy('id');
        $topSalles = $topSalleRows->map(function ($row) use ($salleMap) {
            $s = $salleMap->get($row->salle_id);
            return [
                'id' => $row->salle_id,
                'name' => $s->name ?? null,
                'number' => $s->number ?? null,
                'usage_count' => (int) $row->usage_count,
            ];
        });

        $totalSlots = $sallesCount * count($this->hours) * 6;
        $usedSlots = (clone $ttQuery)->count();
        $occupancyRate = $totalSlots > 0 ? round($usedSlots / $totalSlots, 4) : 0;

        $recentCourses = (clone $courseQuery)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get(['id', 'name', 'acronym', 'classe_id', 'professor_id', 'created_at']);

        return response()->json([
            "courses" => $coursesCount,
            "professors" => $professorsCount,
            "classes" => $classesCount,
            "salles" => $sallesCount,
            "totals" => [
                "courses" => $coursesCount,
                "professors" => $professorsCount,
                "classes" => $classesCount,
                "salles" => $sallesCount,
                "courses_unassigned" => $coursesUnassigned,
                "professors_active" => $professorsActive,
                "professors_inactive" => $professorsInactive,
                "pending_payments_amount" => (int) $pendingPaymentsAmount,
                "pending_payments_count" => $pendingPaymentsCount,
            ],
            "courses_by_status" => $coursesByStatus,
            "weekly_hours" => $weeklyHours,
            "top_professors" => $topProfessors,
            "top_salles" => $topSalles,
            "salle_occupancy_rate" => $occupancyRate,
            "recent_courses" => $recentCourses,
        ]);
    }

    public function chartsData(Request $request){
        $currentDay = $request->day;
        if (!$currentDay) $currentDay = date('N');
        $salles = Salle::all();
        $salles_libres = [];
        $allFree = true;
        foreach ($this->hours as $value) {
            $data = [];
            // traitement et test
            foreach ($salles as $salle) {
                if ($this->isSalleFree($salle, $value[0], $value[1], $currentDay)) {
                    $data[] = [
                        "x" => Str::upper($salle->name),
                        "y" => 10
                    ];
                } else {
                    $data[] = [
                        "x" => Str::upper($salle->name),
                        "y" => 50
                    ];
                    $allFree = false;
                }
            }

            $salles_libres[] = [
                "name" => $value[0],
                "data" => $data
            ];
        }
        return response()->json([
            "salles_libre" => $salles_libres,
            "all_free" => $allFree,
            "day" => $currentDay
        ]);
    }

    public function listSalleDept($departementid)
    {
        return Salle::where('departement_id', '=', $departementid)->get();
    }
}
