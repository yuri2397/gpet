<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ECController;
use App\Http\Controllers\UEController;
use App\Http\Controllers\EPTController;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BatimentController;
use App\Http\Controllers\ChapitreController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\SyllabusController;
use App\Models\Course;
use App\Models\CourseStatus;
use App\Models\Professor;
use App\Models\Ressource;
use App\Models\TimesTable;
use Illuminate\Support\Str;

use Spatie\Permission\Models\Role;
use Facade\FlareClient\Contracts\ProvidesFlareContext;
use Illuminate\Support\Facades\Hash;

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
Route::post('/login', [AuthController::class, "login"])->withoutMiddleware("auth:api");

Route::prefix("user")->middleware("auth:api")->group(function () {
    Route::post('/login', [AuthController::class, "login"])->withoutMiddleware("auth:api");
    Route::get('/logout', [AuthController::class, "logout"])->withoutMiddleware("auth:api");
    Route::get("profile", [AuthController::class, "user"]);
    Route::post("/update-password", [AuthController::class, "updatePassword"]);
    Route::post("/forgot-password", [AuthController::class, "forgotPassword"])->withoutMiddleware("auth:api");
    Route::post("/reset-password", [AuthController::class, "resetPassword"])->withoutMiddleware("auth:api");
    Route::get("/", [UserController::class, "index"]);
    Route::post("create", [UserController::class, "store"]);
    Route::put("update/{id}", [UserController::class, "update"]);
    Route::post("update-avatar", [UserController::class, "updateAvatar"]);
    Route::get("show/{id}", [UserController::class, "show"]);
    Route::delete("destroy/{id}", [UserController::class, "destroy"]);
    Route::get("showuserwithprof/{id}", [UserController::class, "showuserwithprof"]);
});

Route::prefix("batiment")->middleware(['auth:api'])->group(function () {
    Route::get('', [BatimentController::class, "index"]);
    Route::post('create', [BatimentController::class, "store"]);
    Route::put('update/{id}', [BatimentController::class, "update"]);
    Route::delete('destroy/{id}', [BatimentController::class, "destroy"]);
});

Route::prefix("departement")->middleware(['auth:api',])->group(function () {
    Route::get('', [DepartementController::class, "index"]);
    Route::get('show/{id}', [DepartementController::class, "show"]);
    Route::post('create', [DepartementController::class, "store"]);
    Route::put('update/{id}', [DepartementController::class, "update"]);
    Route::delete('destroy/{id}', [DepartementController::class, "destroy"]);
    Route::get('dashboard', [DepartementController::class, 'dashboard']);
    Route::get('charts_data', [DepartementController::class, 'chartsData']);
    Route::get('listSalleDept/{departementid}', [DepartementController::class, 'listSalleDept']);
});

Route::prefix("semester")->middleware(['auth:api'])->group(function () {
    Route::get('by-departement/{departement}', [SemesterController::class, 'findByDepartement']);
    Route::post('create', [SemesterController::class, 'store']);
    Route::put('update/{id}', [SemesterController::class, 'update']);
    Route::delete('delete/{id}', [SemesterController::class, 'destroy']);
});

Route::prefix("classe")->middleware(['auth:api',])->group(function () {
    Route::get('', [ClasseController::class, "index"]);
    Route::get('select', [ClasseController::class, "select"]);
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

Route::prefix("pdf")->middleware(['auth:api'])->group(function () {
    Route::get('edt/{id}', [EPTController::class, "downloadEPT"]);
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
    Route::get('profile', [ProfesseurController::class, "profile"]);
    Route::get('search/{data}', [ProfesseurController::class, "search"]);
    Route::get('show/{id}', [ProfesseurController::class, "show"]);
    Route::post('create', [ProfesseurController::class, "store"]);
    Route::put('update/{id}', [ProfesseurController::class, "update"]);
    Route::delete('destroy/{id}', [ProfesseurController::class, "destroy"]);
    Route::put('desable-account/{id}', [ProfesseurController::class, "desableAccount"]);
    Route::post('course-do', [CourseController::class, 'courseHasProfessor']);
    Route::post('coursedoprofesseur', [CourseController::class, 'coursedoprofesseur']);
    Route::post('do-payment', [CourseController::class, 'doPayment']);
    Route::post('course-to-professor', [CourseController::class, 'courseToProfessor']);
    Route::put('remove-course-professor', [CourseController::class, 'removeCourseProfessor']);
    Route::get("payments/{register_number}", [ProfesseurController::class, "payments"]);
    Route::get('listCoursProf/{professorid}', [ProfesseurController::class, 'listCoursProf']);


    /**
     * MODULE PROFESSEUR
     */

    Route::get('timestables/{professor}', [ProfesseurController::class, 'timestable']);
    Route::post("update-avatar", [ProfesseurController::class, "updateAvatar"]);
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
    Route::get('show-by', [CourseController::class, "showBy"]);
    Route::post('create', [CourseController::class, "store"]);
    Route::put('update/{id}', [CourseController::class, "update"]);
    Route::put('change-course-status/{id}', [CourseController::class, "changeCourseStatus"]);
    Route::put('restore-course-history/{id}', [CourseController::class, "restoreCourse"]);
    Route::get('course-history/{id}', [CourseController::class, "courseHistory"]);
    Route::delete('destroy/{id}', [CourseController::class, "destroy"]);
    Route::get('search/{data}', [CourseController::class, "search"]);
    Route::get('search-my-courses/{data}', [CourseController::class, "searchMyCourse"]);
});

Route::prefix("bank")->middleware(['auth:api'])->group(function () {
    Route::get('', [BankController::class, "index"]);
    Route::get('show/{id}', [BankController::class, "show"]);
    Route::post('create', [BankController::class, "store"]);
    Route::put('update/{id}', [BankController::class, "update"]);
    Route::delete('destroy/{id}', [BankController::class, "destroy"]);
    Route::get('search/{data}', [BankController::class, "search"]);
});

Route::prefix("role")->middleware(['auth:api'])->group(function () {
    Route::get('/', [RoleController::class, "index"]);
    Route::post('/give-permission-to-role', [RoleController::class, "givePermissionToRole"]);
    Route::put('/remove-permission-to-role', [RoleController::class, "removePermissionToRole"]);
    Route::put('/remove-role-for-user', [RoleController::class, "removeRoleForUser"]);
    Route::post('/give-role-for-user', [RoleController::class, "addRoleForUser"]);
    Route::put('/remove-permission-for-user', [RoleController::class, "removePermissionForUser"]);
    Route::put('/give-permission-to-user', [RoleController::class, "givePermissionToUser"]);
    Route::get('not-super', [RoleController::class, 'findRoleOnUserCreate']);
    Route::get("/search-permission/{data}", [RoleController::class, "searchPermission"]);
});

Route::prefix("chapitre")->middleware(['auth:api'])->group(function () {
    Route::get('', [ChapitreController::class, "index"]);
    Route::get('show/{id}', [ChapitreController::class, "show"]);
    Route::post('create', [ChapitreController::class, "store"]);
    Route::put('update/{id}', [ChapitreController::class, "update"]);
    Route::delete('destroy/{id}', [ChapitreController::class, "destroy"]);
    Route::get('search/{data}', [ChapitreController::class, "search"]);
});

Route::prefix("ressource")->middleware(['auth:api'])->group(function () {
    Route::get('', [RessourceController::class, "index"]);
    Route::get('show/{id}', [RessourceController::class, "show"]);
    Route::post('create', [RessourceController::class, "store"]);
    Route::put('update/{id}', [RessourceController::class, "update"]);
    Route::delete('destroy/{id}', [RessourceController::class, "destroy"]);
    Route::get('search/{data}', [RessourceController::class, "search"]);
    Route::get('upload-url/{course}', [RessourceController::class, "getUploadUrl"]);
    Route::post('upload-for-course/{course}', [RessourceController::class, "uploadForCourse"]);
    Route::get('download/{media}', [RessourceController::class, 'downloadMedia']);
});

Route::prefix("seance")->middleware(['auth:api'])->group(function () {
    Route::get('', [SeanceController::class, "index"]);
    Route::get('show/{id}', [SeanceController::class, "show"]);
    Route::post('create', [SeanceController::class, "store"]);
    Route::put('update/{id}', [SeanceController::class, "update"]);
    Route::delete('destroy/{id}', [SeanceController::class, "destroy"]);
    Route::get('search/{data}', [SeanceController::class, "search"]);
});

Route::prefix("syllabus")->middleware(['auth:api'])->group(function () {
    Route::get('', [SyllabusController::class, "index"]);
    Route::get('show/{id}', [SyllabusController::class, "show"]);
    Route::post('create', [SyllabusController::class, "store"]);
    Route::put('update/{id}', [SyllabusController::class, "update"]);
    Route::delete('destroy/{id}', [SyllabusController::class, "destroy"]);
    Route::get('search/{data}', [SyllabusController::class, "search"]);
    Route::get('syllabusDesc/{courseid}', [SyllabusController::class, "syllabusDesc"]);
});


Route::any('test', function (Request $request) {
    // Artisan::call('migrate --seed');
    // return "OKAY";

    return CourseStatus::all();

    // $e = [
    //     "name" => "En attente",
    //     "code" => "wait",
    //     "number" => 1,
    // ];
    // $t = new CourseStatus();
    // $t->label = $e["name"];
    // $t->code = $e["code"];
    // $t->number = $e["number"];
    // $t->save();
});

Route::get('/artisan', function () {
    return Artisan::call('migrate');

    // $timestimes = TimesTable::all();

    // foreach ($timestimes as $key => $value) {
    //     $cours = Course::find($value->course_id);
    //     if(!$cours->professor_id){
    //         $value->delete();
    //     }
    // }
});
