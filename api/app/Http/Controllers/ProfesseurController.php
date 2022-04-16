<?php

namespace App\Http\Controllers;

use UserRole;
use App\Models\User;
use App\Models\Account;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendNewUserMail;
use App\Traits\Utils;


class ProfesseurController extends Controller
{
    use Utils;
    public function __construct()
    {
        $this->middleware("permission:voir professeur")->only(["index", "show"]);
        $this->middleware("role:professeur")->only(["profile"]);
        $this->middleware("permission:modifier professeur")->only(["update"]);
        $this->middleware("permission:creer professeur")->only(["store"]);
        $this->middleware("permission:supprimer professeur")->only(["destroy"]);
        $this->middleware("permission:voir payement")->only(["payments"]);

    }

    public function index()
    {
        $user = User::find(auth()->id());
        if ($user->isAdmin()) {
            return Professor::with('account')->orderBy('created_at', 'desc')->get();
        }
        return Professor::whereDepartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'registration_number' => 'unique:professors,registration_number',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|unique:professors,email',
            'status' => 'required',
            'phone_number' => 'required',
            'account_number' => 'required',
            'departement_id' => 'required|exists:departements,id',
            'rip' => 'required',
            'key' => 'required',
            'bank_id' => 'required|exists:banks,id',
            'cni' => 'required|string|unique:professors,cni',
            'born_in' => "required|string",
            'born_at' => 'required',
            'professor_type_id' => 'required|exists:professor_types,id',
            'last_degree' => "required|string",
        ]);

        DB::beginTransaction();
        $prof = new Professor;
        $prof->registration_number = $request->registration_number ?? $this->randomInt('professors', 'registration_number');
        $prof->first_name = $request->first_name;
        $prof->last_name = $request->last_name;
        $prof->email = $request->email;
        $prof->born_in = $request->born_in;
        $prof->cni = $request->cni;
        $prof->born_at = date($request->born_at);
        $prof->last_degree = $request->last_degree;
        $prof->professor_type_id = $request->professor_type_id;
        $prof->status = $request->status;
        $prof->departement_id = $request->departement_id;
        $prof->phone_number = $request->phone_number;
        $prof->job = $request->job ?? null;

        $prof->save();

        $compte = new Account();
        $compte->account_number = $request->account_number;
        $compte->rip = $request->rip;
        $compte->key = $request->key;
        $compte->bank_id = $request->bank_id;
        $compte->professor_id = $prof->id;
        $compte->save();
        //create a user
        $user = new User;
        $password = Str::random("6");
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->departement_id = $request->departement_id;
        $user->password = bcrypt($password);
        $user->model_type = "Professor";
        $user->model = $prof->id;

        try {
            Mail::to($user->email)->send(new SendNewUserMail($user, $password));
            $user->save();
            $user->assignRole('professeur');
            $user->givePermissionTo(['voir professeur', 'modifier professeur']);
            DB::commit();
            return response()->json(['message' => "Professeur crée avec succès."], 200);
        }
        catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["Error" => $th, 'message' => "Service temporairement indisponible ou en maintenance.
            "], 503);
        }
    }

    public function show($id)
    {
        $prof = Professor::with('account')
            ->with('departement')
            ->with('account.bank')
            ->find($id);

        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            $prof->courses = $prof->courses()->with("classe")->get();
        }
        else {
            $prof->courses = $prof->courses()->whereDepartementId($prof->departement_id)->with("classe")->get();
        }

        return $prof;
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|exists:professors,email',
            'status' => 'required',
            'phone_number' => 'required',
            'account_number' => 'required',
            "departement_id" => "required|exists:departements,id",
            'rip' => 'required',
            'key' => 'required',
            'bank_id' => 'required|exists:banks,id',
            'cni' => 'required|string',
            'born_in' => "required|string",
            'last_degree' => "required|string",
            'born_at' => 'required|date',
            'professor_type_id' => 'required|exists:professor_types,id'
        ]);

        Professor::whereId($id)->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "status" => $request->status,
            "phone_number" => $request->phone_number,
            "job" => $request->job,
            "departement_id" => $request->departement_id,
            "cni" => $request->cni,
            "born_in" => $request->born_in,
            "born_at" => $request->born_at,
            "professor_type_id" => $request->professor_type_id,
            "last_degree" => $request->last_degree,
        ]);

        Account::whereProfessorId($id)->update([
            "account_number" => $request->account_number,
            "rip" => $request->rip,
            "key" => $request->key,
            "bank_id" => $request->bank_id,
        ]);

        return $this->show($id);
    }


    public function destroy($id)
    {
        return response()->json(DB::table("professors")->whereId($id)->delete(), 200);
    }

    public function desableAccount(Request $request, $id)
    {
        $request->validate(['is_active' => 'required|boolean']);
        $prof = Professor::find($id);
        $prof->is_active = $request->is_active;
        $prof->save();
        return response()->json(["message" => "Mis à jour succès."]);
    }

    public function search($data)
    {
        $user = User::find(auth()->id());
        if ($user->hasRole("super admin")) {
            return Professor::where("first_name", 'like', '%' . $data . '%')
                ->orWhere('last_name', 'like', '%' . $data . '%')
                ->orWhere('registration_number', 'like', '%' . $data . '%')
                ->orWhere('cni', 'like', '%' . $data . '%')
                ->orWhere('email', 'like', '%' . $data . '%')
                ->orWhere('phone_number', 'like', '%' . $data . '%')
                ->orderBy('created_at', 'desc')->get();
       }
        return Professor::whereDepartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
    }

    public function payments($register_number)
    {
        $prof = Professor::with("coursesDo")->whereRegistrationNumber($register_number)->first();

        if ($prof) {
            $user = User::find(auth()->id());
            if ($user->hasRole("super admin")) {
                $prof->coursesDo = $prof->coursesDo()->with("course.classe")
                    ->whereYear('courses_has_professors.date', date('Y'))
                    ->join('courses', 'courses_has_professors.course_id', 'courses.id')
                    ->select(
                    "courses_has_professors.course_id",
                    "courses_has_professors.professor_id",
                    "courses_has_professors.is_paid",
                    "courses_has_professors.amount",
                    DB::raw('SUM(courses_has_professors.hours) as total_hours'),
                    DB::raw(' courses_has_professors.amount * SUM(courses_has_professors.hours) as total_sales')
                )
                    ->groupBy(
                    'courses_has_professors.course_id',
                    "courses_has_professors.amount",
                    "courses_has_professors.is_paid",
                    "courses_has_professors.professor_id",
                )
                    ->get();
            }
            else {
                $prof->coursesDo = $prof->coursesDo()->with("course.classe")
                    ->whereYear('courses_has_professors.date', date('Y'))
                    ->join('courses', 'courses_has_professors.course_id', 'courses.id')
                    ->where('courses.departement_id', $prof->departement_id)
                    ->select(
                    "courses_has_professors.course_id",
                    "courses_has_professors.professor_id",
                    "courses_has_professors.is_paid",
                    "courses_has_professors.amount",
                    DB::raw('SUM(courses_has_professors.hours) as total_hours'),
                    DB::raw(' courses_has_professors.amount * SUM(courses_has_professors.hours) as total_sales')
                )
                    ->groupBy(
                    'courses_has_professors.course_id',
                    "courses_has_professors.amount",
                    "courses_has_professors.is_paid",
                    "courses_has_professors.professor_id",
                )->get();
            }

        }

        return $prof;
    }

    public function profile(){
        return response()->json($this->currentUser()->professor);
    }
}
