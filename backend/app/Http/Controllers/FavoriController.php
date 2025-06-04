<?php

namespace App\Http\Controllers;

use App\Models\Favori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Pour l'authentification de l'utilisateur

class FavoriController extends Controller
{
    /**
     * Display a listing of the resource (favorite items for the authenticated user).
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Assurez-vous qu'un utilisateur est authentifié
        if (!Auth::check()) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        // Récupérer tous les favoris de l'utilisateur authentifié
        // Eager load the 'vetement' relationship to get clothing details
        $favoris = Auth::user()->favoris()->with('vetement.morphology')->get();

        return response()->json($favoris);
    }

    /**
     * Store a newly created favorite item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Assurez-vous qu'un utilisateur est authentifié
        if (!Auth::check()) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $validated = $request->validate([
            'vetement_id' => 'required|exists:vetements,id',
        ]);

        $userId = Auth::id();
        $vetementId = $validated['vetement_id'];

        // Vérifier si l'article est déjà en favori pour cet utilisateur
        $existingFavori = Favori::where('user_id', $userId)
                                ->where('vetement_id', $vetementId)
                                ->first();

        if ($existingFavori) {
            return response()->json(['message' => 'Cet article est déjà dans vos favoris.'], 409); // 409 Conflict
        }

        $favori = Favori::create([
            'user_id' => $userId,
            'vetement_id' => $vetementId,
        ]);

        // Retourner le favori avec les détails du vêtement
        $favori->load('vetement.morphology');

        return response()->json($favori, 201); // 201 Created
    }

    /**
     * Remove the specified favorite item from storage.
     *
     * @param  int  $vetement_id  (We'll pass the vetement_id directly for deletion)
     * @return \Illuminate\Http\Response
     */
    public function destroy($vetement_id)
    {
        // Assurez-vous qu'un utilisateur est authentifié
        if (!Auth::check()) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $userId = Auth::id();

        // Trouver le favori spécifique pour l'utilisateur et le vêtement
        $favori = Favori::where('user_id', $userId)
                        ->where('vetement_id', $vetement_id)
                        ->first();

        if (!$favori) {
            return response()->json(['message' => 'Favori non trouvé pour cet utilisateur et ce vêtement.'], 404);
        }

        $favori->delete();

        return response()->json(['message' => 'Article retiré des favoris avec succès.'], 200);
    }

    // Les méthodes show, update ne sont pas nécessaires pour une gestion simple des favoris (ajout/suppression)
    // Vous pouvez les laisser vides ou les supprimer si vous n'en avez pas besoin.
    public function show($id) {}
    public function update(Request $request, $id) {}
}