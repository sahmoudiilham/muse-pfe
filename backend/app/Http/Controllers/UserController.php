<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}