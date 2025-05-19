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
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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


    public function dashboard()
    {

        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return response()->json([
                "courses" => count(Course::all()),
                "professors" => count(Professor::all()),
                "classes" => count(Classe::all()),
                "salles" => count(Salle::all()),
            ]);
        }
        $departement = Departement::find($user->departement_id);

        $restult = [
            "courses" => count(Course::whereDepartementId($departement->id)->get()),
            "professors" => count(Professor::whereDepartementId($departement->id)->get()),
            "classes" => count(Classe::whereDepartementId($departement->id)->get()),
            "salles" => count(Salle::whereDepartementId($departement->id)->get()),
        ];
        return response()->json($restult);
    }

    public function salleLibres(Request $request)
    {
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
                        "y" => 0,
                    ];
                } else {

                    $data[] = [
                        "x" => Str::upper($salle->name),
                        "y" => 1,
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

    public function chartsData(Request $request)
    {


        /**
          Je veux un tableau de ce type
          [
              {
                  start: new Date(),
                  title: 'Event 1',
                  color: {
                    primary: '#ad2121',
                    secondary: '#FAE3E3',
                  },
              }
          ]
         */

        $events = [];

        $timesTables = TimesTable::where('salle_id', '!=', null)->get();

        foreach ($timesTables as $timesTable) {
            // get date from times table join start and end time and day
            $start = $this->getDateStartFromTimesTable($timesTable);
            $end = $this->getDateEndFromTimesTable($timesTable);

            $item = [
                "start" => $start,
                "end" => $end,
                "title" => $timesTable->salle->name ?? null,
                "meta" => [
                    "course" => $timesTable->course->name,
                    "classe" => $timesTable->classe->name,
                    "professor" => $timesTable->professor->first_name . " " . $timesTable->professor->last_name,
                    "salle" => $timesTable->salle->name ?? null,
                    "course_id" => $timesTable->course->id,
                    "classe_id" => $timesTable->classe->id,
                    "professor_id" => $timesTable->professor->id,
                ],
                "color" => $this->getRandomColorName()
            ];

            $events[] = $item;
        }

        return response()->json($events);
    }

    function getRandomColorName()
    {
        $colorMap = [
            'color-geekblue' => '#023e8a',
            'color-orange' => '#0077b6',
            'color-volcano' => '#0096c7',
            'color-default' => '#48cae4',
            'color-green' => '#90e0ef',
            'color-red' => '#caf0f8',
        ];

        // Obtient une clé aléatoire du tableau
        $randomKey = array_rand($colorMap);

        // Retourne le nom de la couleur correspondant à la clé aléatoire
        return $colorMap[$randomKey];
    }

    public function listSalleDept($departementid)
    {
        return Salle::where('departement_id', '=', $departementid)->get();
    }
}
