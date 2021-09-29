<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BatimentController;


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
