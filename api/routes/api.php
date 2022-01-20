<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ECController;
use App\Http\Controllers\UEController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BatimentController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\EPTController;
use App\Http\Controllers\SemesterController;
use App\Models\User;

/**
 * SERVICES WEB POUR LES EMPLOIS DU TEMPS
 */


Route::get("ept/ws/{departement}/{classe}", [EPTController::class, 'serviceWebEPT']);

Route::post('selectable', function (Request $request) {
    $res = [];
    foreach ($request->all() as $r) {
        try {
            $res[$r] = DB::table($r)->get();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Table '" . $r . "' est introuvable"
            ], 404);
        }
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
    Route::get('show/{id}', [DepartementController::class, "show"])->withoutMiddleware('role:super admin');
    Route::post('create', [DepartementController::class, "store"]);
    Route::put('update/{id}', [DepartementController::class, "update"]);
    Route::delete('destroy/{id}', [DepartementController::class, "destroy"]);

});

Route::prefix("semester")->middleware(['auth:api'])->group(function () {

    Route::get('by-departement/{departement}', [SemesterController::class, 'findByDepartement']);
    Route::post('create', [SemesterController::class, 'store']);
});

Route::prefix("classe")->middleware(['auth:api',])->group(function () {
    Route::get('', [ClasseController::class, "index"]);
    Route::get('departement/{id}', [ClasseController::class, "findByDepartement"]);
    Route::post('create', [ClasseController::class, "store"]);
    Route::get('show/{id}', [ClasseController::class, 'show']);
    Route::put('update/{id}', [ClasseController::class, "update"]);
    Route::delete('destroy/{id}', [ClasseController::class, "destroy"]);


});
Route::prefix("ept")->middleware(['auth:api'])->group(function () {
    Route::get('', [EPTController::class, "index"]);
    Route::post('create', [EPTController::class, "store"]);
    Route::put('update/{id}', [EPTController::class, "update"]);
    Route::get('show/{id}', [EPTController::class, "show"]);
    Route::delete('destroy/{id}', [EPTController::class, "destroy"]);
});
Route::prefix("salle")->middleware(['auth:api'])->group(function () {
    Route::get('', [SalleController::class, "index"]);
    Route::post('create', [SalleController::class, "store"]);
    Route::put('update/{id}', [SalleController::class, "update"]);
    Route::delete('destroy/{id}', [SalleController::class, "destroy"]);
    Route::get('search/{data}', [SalleController::class, "search"]);
});

Route::prefix("professeur")->middleware(['auth:api',])->group(function () {
    Route::get('', [ProfesseurController::class, "index"]);
    Route::get('search/{data}', [ProfesseurController::class, "search"]);
    Route::get('show/{id}', [ProfesseurController::class, "show"]);
    Route::post('create', [ProfesseurController::class, "store"]);
    Route::put('update/{id}', [ProfesseurController::class, "update"]);
    Route::delete('destroy/{id}', [ProfesseurController::class, "destroy"]);
    Route::put('desable-account/{id}', [ProfesseurController::class, "desableAccount"]);
    Route::post('course-do', [CourseController::class, 'courseHasProfessor']);
    Route::post('do-payment', [CourseController::class, 'doPayment']);
    Route::post('course-to-professor', [CourseController::class, 'courseToProfessor']);
    Route::put('remove-course-professor', [CourseController::class, 'removeCourseProfessor']);
    Route::get("payments/{register_number}", [ProfesseurController::class, "payments"]);
});

Route::prefix("ue")->middleware(['auth:api'])->group(function () {
    Route::get('', [UEController::class, "index"]);
    Route::get('search/{data}', [UEController::class, "search"]);
    Route::get('show/{id}', [UEController::class, "show"]);
    Route::post('create', [UEController::class, "store"]);
    Route::put('update/{id}', [UEController::class, "update"]);
    Route::delete('destroy/{id}', [UEController::class, "destroy"]);
});

Route::prefix("ec")->middleware(['auth:api'])->group(function () {
    Route::get('', [ECController::class, "index"]);
    Route::get('search/{data}', [ECController::class, "search"]);
    Route::get('show/{id}', [ECController::class, "show"]);
    Route::post('create', [ECController::class, "store"]);
    Route::put('update/{id}', [ECController::class, "update"]);
    Route::delete('destroy/{id}', [ECController::class, "destroy"]);
});

Route::prefix("course")->middleware(['auth:api',])->group(function () {
    Route::get('', [CourseController::class, "index"]);
    Route::get('show/{id}', [CourseController::class, "show"]);
    Route::post('create', [CourseController::class, "store"]);
    Route::put('update/{id}', [CourseController::class, "update"]);
    Route::delete('destroy/{id}', [CourseController::class, "destroy"]);
    Route::get('search/{data}', [CourseController::class, "search"]);
});

Route::prefix("bank")->middleware(['auth:api'])->group(function () {
    Route::get('', [BankController::class, "index"]);
    Route::get('show/{id}', [BankController::class, "show"]);
    Route::post('create', [BankController::class, "store"]);
    Route::put('update/{id}', [BankController::class, "update"]);
    Route::delete('destroy/{id}', [BankController::class, "destroy"]);
    Route::get('search/{data}', [BankController::class, "search"]);
});


Route::any('test', function (Request $request) {
    return "API TEST";
});
