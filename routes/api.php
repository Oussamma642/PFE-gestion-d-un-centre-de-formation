<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ControleController;
use App\Http\Controllers\Api\EtudiantController;
use App\Http\Controllers\Api\ExamenController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\ResultatExamenController;
use App\Http\Controllers\Api\UserController;
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
    Route::get('/etudiants/annee/{annee}/filiere/{filiere}', [EtudiantController::class, 'showByAnneeFiliere']);

    // ------ Modules
    Route::get('/modules/annee/{annee}/filiere/{filiere}', [ModuleController::class, 'showByAnneeFiliere']);
    Route::apiResource('/modules', ModuleController::class);

                                                                                                                                            // ------ Controles
    Route::get('/controles/module/{id}', [ControleController::class, "getControlesByModuleId"]);                                            // Based on the module Id
    Route::get('/controles/modules/premiere_annee/filiere/{filiere}', [ControleController::class, "getControlesOfPremiereAnneeByFiliere"]); // Based on the filiere, fetch all the modules of premiere_anne

    // ------ Notes Controles
    Route::get('/notes/module/{moduleId}', [NoteController::class, 'getNotesByModuleId']);
    Route::post('/notes/controles', [NoteController::class, 'store']);
    Route::get('/notes/export/{moduleId}', [NoteController::class, 'exportNotes']);

    // ------ Examens To fetch examens infos by ID
    Route::get('examens/module/{id}', [ExamenController::class, "getExamensByModuleId"]);
    // ------ Examens of premiere_annee To fetch examens infos by filiere
    Route::get('examens/modules/premiere_annee/filiere/{filiere}', [ExamenController::class, "getExamensOfPremiereAnneeByFiliere"]);

                                                                                                                                       // ------ Notes Examens
    Route::get('/notesexamens/module/{moduleId}', [ResultatExamenController::class, 'getNotesByModuleId']);                            // to fetch existing exmanes notes by module ID
    Route::get('/notesexamens/premiere_annee/filiere/{filiere}', [ResultatExamenController::class, 'getExamensNotesOfPremiereAnnee']); // to fetch existing exmanes notes by module ID
    Route::post('/notes/examens', [ResultatExamenController::class, 'store']);

    // ------ Passage 1 vers 2
    // ------ get notes of controles of all the modules of premiere annee of a filiere
    Route::get('/notes/premiere_annee/filiere/{filiere}', [NoteController::class, 'getNotesOfPremiereAnnee']);

    // --------- Bulletin APIs
    Route::prefix('bulletin')->group(function () {

        // --------- GET Student Infos, his filiere and promotions
        Route::get('/etudiants/{id}', [EtudiantController::class, 'getEtudiantPersonalInfos']);

    });

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);