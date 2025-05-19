<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EPTController;
use App\Http\Controllers\PublicEdtController;

Route::get("edt/{departement}/{classe}", [EPTController::class, 'serviceWebEPT']);

Route::get("public-edt",[PublicEdtController::class, 'publicEDT']);

Route::get('/', function(){
	return date("Y-m-d H:i:s") . " : " . "API is running";
});
