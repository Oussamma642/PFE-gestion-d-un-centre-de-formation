<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ControleController;
use App\Http\Controllers\Api\EtudiantController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\FiliereController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);

    // Filieres
    Route::apiResource('/filieres', FiliereController::class);

    // ------ Etudiants
    Route::apiResource('/etudiants', EtudiantController::class);
    // Route::get('/etudiants/annee/{annee}', [EtudiantController::class, 'showByAnnee']);
    Route::get('/etudiants/annee/{annee}/filiere/{filiere}', [EtudiantController::class, 'showByAnneeFiliere']);

    // ------ Modules
    // 
    // Route::get('/modules/annee/{annee}', [ModuleController::class, 'showByAnnee']);
    Route::get('/modules/annee/{annee}/filiere/{filiere}', [ModuleController::class, 'showByAnneeFiliere']);
    Route::apiResource('/modules', ModuleController::class);

    // ------ Controles
    Route::get('controles/module/{id}', [ControleController::class, "getControlesByModuleId"]);

    // ------ Notes
    // Route::get('/notes', [NoteController::class, 'index']);
    Route::get('/notes/module/{moduleId}', [NoteController::class, 'getNotesByModuleId']);

    Route::post('/notes', [NoteController::class, 'store']);

    Route::get('/notes/export/{moduleId}', [NoteController::class, 'exportNotes']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);