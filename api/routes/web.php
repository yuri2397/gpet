<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EPTController;


Route::get("edt/{departement}/{classe}", [EPTController::class, 'serviceWebEPT']);

Route::get("", function(){
	// ini_set('max_input_vars', 4000);

	return phpinfo();
});