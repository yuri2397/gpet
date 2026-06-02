<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function randomInt($table, $columnName)
    {
        while (true) {
            $code = random_int(100000, 999999);
            $row = DB::table($table)->where($columnName, $code)->first();
            if ($row == null) {
                return Str::upper($code);
            }
        }
    }
}
