<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Importation des contrôleurs publics
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
use App\Http\Controllers\ShareController;

// Importation des contrôleurs d'administration
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminFavoriController;
use App\Http\Controllers\Admin\AdminPaletteController;
use App\Http\Controllers\Admin\AdminMorphologyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Routes publiques (accessibles sans authentification)
Route::group([], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // API Resource pour les vêtements (lecture seule pour le public)
    Route::apiResource('vetements', VetementController::class)->only(['index', 'show']);

    // Route pour générer un lien de partage de vêtement
    Route::get('/share/vetement/{vetementId}', [ShareController::class, 'generateVetementShareUrl']);
});


// Routes protégées par Sanctum (nécessitent une authentification)
Route::middleware('auth:sanctum')->group(function () {
    // Route pour récupérer les informations de l'utilisateur authentifié
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Route de déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes pour la gestion des favoris de l'utilisateur
    Route::get('/favoris', [FavoriController::class, 'index']);
    Route::post('/favoris', [FavoriController::class, 'store']);
    Route::delete('/favoris/{vetement_id}', [FavoriController::class, 'destroy']);

    // API Resources pour les fonctionnalités utilisateur
    Route::apiResource('posts', PostController::class);
    // API Resource pour les vêtements (création, mise à jour, suppression pour les utilisateurs authentifiés)
    Route::apiResource('vetements', VetementController::class)->except(['index', 'show']);
    Route::apiResource('palettes', PaletteController::class);
    Route::apiResource('visages', VisageController::class);
    Route::apiResource('messages-ia', MessageIAController::class);
    Route::apiResource('morphologies', MorphologyController::class);
    Route::apiResource('hairstyles', HairstyleController::class);
    Route::apiResource('glasses', GlassesController::class);
});

// Routes d'administration (nécessitent l'authentification Sanctum et le middleware 'admin')
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Gestion des utilisateurs par l'administrateur
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::get('/users/{id}', [AdminUserController::class, 'show']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);
    Route::patch('/users/{id}/role', [AdminUserController::class, 'updateRole']);

    // Gestion des favoris par l'administrateur
    Route::get('/favoris', [AdminFavoriController::class, 'index']);
    Route::delete('/favoris/{id}', [AdminFavoriController::class, 'destroy']);

    // Gestion des palettes par l'administrateur
    Route::get('/palettes', [AdminPaletteController::class, 'index']);
    Route::put('/palettes/{id}', [AdminPaletteController::class, 'update']);
    Route::post('/palettes/reset', [AdminPaletteController::class, 'reset']);

    // Gestion des morphologies par l'administrateur
    Route::get('/morphologies', [AdminMorphologyController::class, 'index']);
    Route::put('/morphologies/{id}', [AdminMorphologyController::class, 'update']);
    Route::post('/morphologies/reset', [AdminMorphologyController::class, 'reset']);
});
