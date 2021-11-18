<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BankController extends Controller
{
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
        return DB::table('banks')->whereId($id)->first()->update($request->all());
    }

    public function destroy($id)
    {
       return DB::table('banks')->whereId($id)->delete();
    }


}
