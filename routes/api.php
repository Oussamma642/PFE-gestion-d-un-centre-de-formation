<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EtudiantController;
use App\Http\Controllers\Api\ModuleController;


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

Route::middleware('auth:sanctum')->group(function(){    
    
    Route::get('/user', function (Request $request) {
            return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/users', UserController::class);

    
    // ------ Etudiants
    Route::apiResource('/etudiants', EtudiantController::class);
    Route::get('/etudiants/annee/{annee}', [EtudiantController::class, 'showByAnnee']);


    // ------ Modules
    // Route::get('/modules/annee/{annee}', [ModuleController::class, 'showByAnnee']);
    Route::get('/modules/annee/{annee}', [ModuleController::class, 'showByAnnee']);
    Route::apiResource('/modules', ModuleController::class);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);