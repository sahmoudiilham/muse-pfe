<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('posts', PostController::class);




/** Register */
Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    return response()->json(['token' => $user->createToken('api-token')->plainTextToken]);
});

/** Login */
Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json(['token' => $user->createToken('api-token')->plainTextToken]);
});

/** Protected Route */
Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return $request->user();
});

/** Logout */
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
});
use App\Http\Controllers\PaletteController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('palettes', PaletteController::class);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('morphologies', MorphologyController::class);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('hairstyles', HairstyleController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('glasses', GlassesController::class);
});
