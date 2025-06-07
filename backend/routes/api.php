<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;




// 📦 Importation des contrôleurs publics

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

// 📦 Importation des contrôleurs d'administration
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminFavoriController;
use App\Http\Controllers\Admin\AdminPaletteController;
use App\Http\Controllers\Admin\AdminMorphologyController;
use App\Http\Controllers\Admin\AdminStatsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🔓 Routes publiques (accessibles sans authentification)
Route::group([], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::apiResource('vetements', VetementController::class)->only(['index', 'show']);
    Route::get('/share/vetement/{vetementId}', [ShareController::class, 'generateVetementShareUrl']);
});

// routes/api.php
Route::middleware('auth:sanctum')->put('/user/morphology', [UserController::class, 'updateMorphology']);
Route::middleware('auth:sanctum')->put('/user/palette', [UserController::class, 'updatePalette']);
Route::middleware('auth:sanctum')->put('/user/morphology', [AdminUserController::class, 'updateMorphology']);
Route::middleware(['auth:sanctum'])->get('/admin/users', [AdminController::class, 'index']);
Route::middleware(['auth:api', 'admin'])->get('/admin/users', [AdminUserController::class, 'index']);
Route::middleware('auth:api')->get('/me', function (Request $request) {
    return $request->user();
});




// 🔐 Routes protégées par Sanctum (authentification requise)
Route::middleware('auth:sanctum')->group(function () {
    // Récupération de l'utilisateur connecté
    Route::get('/user', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role, // ✅ يرجع الدور
    ]);
});
Route::middleware('auth:sanctum')->get('/admin/stats', [AdminStatsController::class, 'index']);

    Route::post('/logout', [AuthController::class, 'logout']);

    // ⭐ Gestion des favoris utilisateur
    Route::get('/favoris', [FavoriController::class, 'index']);
    Route::post('/favoris', [FavoriController::class, 'store']);
    Route::delete('/favoris/{vetement_id}', [FavoriController::class, 'destroy']);

    // 🔧 API Resources principales (CRUD)
    Route::apiResource('posts', PostController::class);
    Route::apiResource('vetements', VetementController::class)->except(['index', 'show']);
    Route::apiResource('palettes', PaletteController::class);
    Route::apiResource('visages', VisageController::class);
    Route::apiResource('messages-ia', MessageIAController::class);
    Route::apiResource('morphologies', MorphologyController::class);
    Route::apiResource('hairstyles', HairstyleController::class);
    Route::apiResource('glasses', GlassesController::class);
});

// 🛡️ Routes d'administration (auth + middleware admin)
 Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // 👥 Gestion des utilisateurs
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::get('/users/{id}', [AdminUserController::class, 'show']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);
    Route::patch('/users/{id}/role', [AdminUserController::class, 'updateRole']);

    // ❤️ Gestion des favoris
    Route::get('/favoris', [AdminFavoriController::class, 'index']);
    Route::delete('/favoris/{id}', [AdminFavoriController::class, 'destroy']);

    // 🎨 Gestion des palettes
    Route::get('/palettes', [AdminPaletteController::class, 'index']);
    Route::put('/palettes/{id}', [AdminPaletteController::class, 'update']);
    Route::post('/palettes/reset', [AdminPaletteController::class, 'reset']);

    // 📏 Gestion des morphologies
    Route::get('/morphologies', [AdminMorphologyController::class, 'index']);
    Route::get('/morphologies/{id}', [AdminMorphologyController::class, 'show']);
    Route::post('/morphologies', [AdminMorphologyController::class, 'store']);
    Route::put('/morphologies/{id}', [AdminMorphologyController::class, 'update']);


    Route::put('/morphologies/{id}', [AdminMorphologyController::class, 'update']);
    Route::delete('/morphologies/{id}', [AdminMorphologyController::class, 'destroy']);
});

// ✅ Route de vérification du rôle de l'utilisateur
Route::middleware('auth:sanctum')->get('/check-role', function () {
    $user = auth()->user();
    return response()->json([
        'user' => $user,
        'is_admin' => $user?->isAdmin(),
    ]);
});




Route::post('/login', [AuthController::class, 'login']);

// الراوتات المحمية (خصك توضعهم بعد تسجيل الدخول)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/morphologies', function(Request $request) {
        // مثال: إرجاع كل morphologies
        return \App\Models\Morphology::all();
    });

    // أي راوت آخر محمي
});
