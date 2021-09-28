<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix("user")->middleware("auth:api")->group(function () {
    Route::post('/login', [AuthController::class, "login"])->withoutMiddleware("auth:api");
    Route::get("profile", [AuthController::class, "user"]);

    Route::get("/", [UserController::class, "index"]);
    Route::post("create", [UserController::class, "store"])->middleware("role:super admin");;
    Route::put("update/{id}", [UserController::class, "update"])->middleware("role:super admin");
    Route::get("show/{id}", [UserController::class, "show"])->middleware("role:super admin");
    Route::delete("destroy/{id}", [UserController::class, "destroy"])->middleware("role:super admin");
});
