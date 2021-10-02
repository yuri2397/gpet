<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BatimentController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\DepartementController;

Route::post('selectable', function (Request $request) {
    $res = [];
    foreach ($request->all() as $r) {
        $res[$r] = DB::table($r)->get();
    }
    return $res;
});


Route::prefix("user")->middleware("auth:api")->group(function () {
    Route::post('/login', [AuthController::class, "login"])->withoutMiddleware("auth:api");
    Route::get("profile", [AuthController::class, "user"]);

    Route::get("/", [UserController::class, "index"]);
    Route::post("create", [UserController::class, "store"])->middleware("role:super admin");;
    Route::put("update/{id}", [UserController::class, "update"])->middleware("role:super admin");
    Route::get("show/{id}", [UserController::class, "show"])->middleware("role:super admin");
    Route::delete("destroy/{id}", [UserController::class, "destroy"])->middleware("role:super admin");
});

Route::prefix("batiment")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [BatimentController::class, "index"])->withoutMiddleware('role:super admin');
    Route::post('create', [BatimentController::class, "store"]);
    Route::put('update/{id}', [BatimentController::class, "update"]);
    Route::delete('destroy/{id}', [BatimentController::class, "destroy"]);
});

Route::prefix("departement")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [DepartementController::class, "index"])->withoutMiddleware('role:super admin');
    Route::post('create', [DepartementController::class, "store"]);
    Route::put('update/{id}', [DepartementController::class, "update"]);
    Route::delete('destroy/{id}', [DepartementController::class, "destroy"]);
});

Route::prefix("classe")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [ClasseController::class, "index"])->withoutMiddleware('role:super admin');
    Route::get('departement/{id}', [ClasseController::class, "findByDepartement"])->withoutMiddleware('role:super admin');
    Route::post('create', [ClasseController::class, "store"]);
    Route::put('update/{id}', [ClasseController::class, "update"]);
    Route::delete('destroy/{id}', [ClasseController::class, "destroy"]);
});

Route::prefix("salle")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [SalleController::class, "index"])->withoutMiddleware('role:super admin');
    Route::post('create', [SalleController::class, "store"]);
    Route::put('update/{id}', [SalleController::class, "update"]);
    Route::delete('destroy/{id}', [SalleController::class, "destroy"]);
});


Route::prefix("professeur")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [ProfesseurController::class, "index"])->withoutMiddleware('role:super admin');
    Route::get('search/{data}', [ProfesseurController::class, "search"])->withoutMiddleware('role:super admin');
    Route::get('show/{id}', [ProfesseurController::class, "show"])->withoutMiddleware('role:super admin');
    Route::post('create', [ProfesseurController::class, "store"]);
    Route::put('update/{id}', [ProfesseurController::class, "update"]);
    Route::delete('destroy/{id}', [ProfesseurController::class, "destroy"]);
    Route::put('desable-account/{id}', [ProfesseurController::class, "desableAccount"]);
});


Route::prefix("course")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [CourseController::class, "index"])->withoutMiddleware('role:super admin');
    Route::get('show/{id}', [CourseController::class, "show"])->withoutMiddleware('role:super admin');
    Route::post('create', [CourseController::class, "store"]);
    Route::put('update/{id}', [CourseController::class, "update"]);
    Route::delete('destroy/{id}', [CourseController::class, "destroy"]);
});


Route::prefix("bank")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [BankController::class, "index"])->withoutMiddleware('role:super admin');
    Route::get('show/{id}', [BankController::class, "show"])->withoutMiddleware('role:super admin');
    Route::post('create', [BankController::class, "store"]);
    Route::put('update/{id}', [BankController::class, "update"]);
    Route::delete('destroy/{id}', [BankController::class, "destroy"]);
});
