<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BatimentController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;

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

Route::prefix("salle")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [SalleController::class, "index"])->withoutMiddleware('role:super admin');
    Route::post('create', [SalleController::class, "store"]);
    Route::put('update/{id}', [SalleController::class, "update"]);
    Route::delete('destroy/{id}', [SalleController::class, "destroy"]);
});


Route::prefix("professeur")->middleware(['auth:api', 'role:super admin'])->group(function () {
    Route::get('', [ProfesseurController::class, "index"])->withoutMiddleware('role:super admin');
    Route::get('show/{id}', [ProfesseurController::class, "show"])->withoutMiddleware('role:super admin');
    Route::post('create', [ProfesseurController::class, "store"]);
    Route::put('update/{id}', [ProfesseurController::class, "update"]);
    Route::delete('destroy/{id}', [ProfesseurController::class, "destroy"]);
});
