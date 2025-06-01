<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MorphologyController;
use App\Http\Controllers\HairstyleController;
use App\Http\Controllers\GlassesController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\VetementController;
use App\Http\Controllers\VisageController;
use App\Http\Controllers\MessageIAController;
use App\Http\Controllers\PaletteController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (need token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('posts', PostController::class);
    Route::apiResource('favoris', FavoriController::class);
    Route::apiResource('vetements', VetementController::class);
    Route::apiResource('palettes', PaletteController::class);
    Route::apiResource('visages', VisageController::class);
    Route::apiResource('messages-ia', MessageIAController::class);
    Route::apiResource('morphologies', MorphologyController::class);
    Route::apiResource('hairstyles', HairstyleController::class);
    Route::apiResource('glasses', GlassesController::class);
});
