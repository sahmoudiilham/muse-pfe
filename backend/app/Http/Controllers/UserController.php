<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    // Lister tous les utilisateurs
    public function index()
    {
        return User::all();
    }

    // Voir les détails d'un utilisateur (avec favoris, morphologie, etc.)
    public function show($id)
    {
        $user = User::with(['favoris.vetement', 'morphology'])->findOrFail($id);
        return response()->json($user);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    // Changer le rôle d'un utilisateur
    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = $request->input('role', 'user');
        $user->save();
        return response()->json(['message' => 'Rôle mis à jour']);
    }
    public function setMorphology(Request $request) {
    $request->validate(['morphology_id' => 'required|exists:morphologies,id']);
    $user = auth()->user();
    $user->morphology_id = $request->morphology_id;
    $user->save();
    return response()->json(['message' => 'Morphology saved']);
}

public function setPalette(Request $request) {
    $request->validate(['palette_id' => 'required|exists:palettes,id']);
    $user = auth()->user();
    $user->palette_id = $request->palette_id;
    $user->save();
    return response()->json(['message' => 'Palette saved']);
}

public function updateMorphology(Request $request)
{
    $request->validate([
        'morphology_id' => 'required|exists:morphologies,id',
    ]);

    $user = Auth::user();
    $user->morphology_id = $request->morphology_id;
    $user->save();

    return response()->json(['message' => 'Morphologie mise à jour', 'user' => $user]);
}

public function updatePalette(Request $request)
{
    $request->validate([
        'palette_id' => 'required|exists:palettes,id',
    ]);

    $user = Auth::user();
    $user->palette_id = $request->palette_id;
    $user->save();

    return response()->json(['message' => 'Palette mise à jour', 'user' => $user]);
}
}