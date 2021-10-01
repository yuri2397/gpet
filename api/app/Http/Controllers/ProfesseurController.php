<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesseurController extends Controller
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
            $profs = Professor::all();
            foreach ($profs as $p) {
                $p->account;
            }
            return $profs;
        }
        return Professor::whereDerpartementId($user->departement_id)->orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|unique:professors,email',
            'status' => 'required',
            'phone_number' => 'required',
            'account_number' => 'required',
            'rip' => 'required',
            'key' => 'required',
            'bank_id' => 'required|exists:banks,id'
        ]);

        $user = User::find(auth()->id());

        $prof = new Professor;
        $prof->registration_number = $this->randomInt('professors', 'registration_number');
        $prof->first_name = $request->first_name;
        $prof->departement_id = $user->departement_id;
        $prof->last_name = $request->last_name;
        $prof->email = $request->email;
        $prof->status = $request->status;
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

        return response()->json($this->show($prof->id), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $prof = Professor::find($id);
        $prof->account;
        $prof->account->bank;
        $prof->courses = $prof->courses()
            ->join("semesters", 'semesters.id', 'courses.semester_id')
            ->join("classes", 'classes.id', 'courses.classe_id')
            ->join("e_c_s", 'e_c_s.id', 'courses.ec_id')
            ->join("u_e_s", 'u_e_s.id', 'e_c_s.ue_id')
            ->join("services", 'services.id', 'courses.service_id')
            ->select(
                "courses.*",
                "services.name as service",
                "e_c_s.name as ec",
                "u_e_s.name as ue",
                "classes.name as classe",
                "semesters.name as semester",
            )
            ->get();
        $prof->coursesDo = $prof->coursesDo()
            ->join("courses", "courses.id", "courses_has_professors.course_id")
            ->join("classes", 'classes.id', 'courses.classe_id')
            ->join("services", 'services.id', 'courses.service_id')
            ->select(
                "courses.acronym",
                "services.id",
                "services.name as service",
                "classes.name as classe",
                "courses.name as course",
                DB::raw('SUM(courses_has_professors.amount) as total_sales'),
                DB::raw('SUM(courses_has_professors.hours) as total_hours')
            )
            ->groupBy(
                'courses.acronym',
                "services.id",
                "services.name",
                "classes.name",
                "courses.name"
            )
            ->get();
        return $prof;
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
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|unique:professors,email',
            'status' => 'required',
            'phone_number' => 'required'
        ]);
        DB::table('professors')->whereId($id)->update($request->all());
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
        return response()->json(DB::table("professors")->whereId($id)->delete(), 200);
    }
}
