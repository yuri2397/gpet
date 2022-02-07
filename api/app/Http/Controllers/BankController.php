<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Bank;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BankController extends Controller
{

    public function __construct()
    {
        $this->middleware("permission:voir banque")->only(["index", "show"]);
        $this->middleware("permission:modifier banque")->only(["update"]);
        $this->middleware("permission:creer banque")->only(["store"]);
        $this->middleware("permission:supprimer banque")->only(["destroy"]);
    }
    public function index()
    {
        return Bank::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required', 'code' => 'required']);
        $b = new Bank;
        $b->name = $request->name;
        $b->code = $request->code;
        $b->save();
        return response()->json($b, 200);
    }

    public function show($id)
    {
        return Bank::find($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['name' => 'required', 'code' => 'required']);
        $bank = Bank::find($id);
        $bank->name = $request->name;
        $bank->code = $request->code;
        $bank->save();
        return $this->show($id);
    }

    public function destroy($id)
    {
        $professors = Account::whereBankId($id)->get();
        if (count($professors) == 0)
            return DB::table('banks')->whereId($id)->delete();
        else return response()->json(["message" => "Cette bank est liée à un compte professeur."], 400);
    }

    public function search($data)
    {
        return Bank::where('name', 'like', '%' . $data . '%')
            ->orWhere('code', 'like', '%' . $data . '%')
            ->get();
    }
}
