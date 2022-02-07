<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function randomInt($table, $columnName){
        while(true){
            $code = random_int(100000, 999999);
            $row = DB::table($table)->where($columnName, $code)->first();
            if($row == null){
                return Str::upper($code);
            }
        }
    }
}
