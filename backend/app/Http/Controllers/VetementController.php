<?php

namespace App\Http\Controllers;

use App\Models\Vetement;
use Illuminate\Http\Request;

class VetementController extends Controller
{
    // 1. Lister tous les vêtements avec morphology liée
    public function index()
    {
 $vetements = Vetement::with('morphology')->get();
    return response()->json($vetements);    }

    // 2. Créer un nouveau vêtement
    public function store(Request $request)
    {
        // Validation basique
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string', // attend le chemin ou le nom de fichier image
            'morphology_id' => 'required|exists:morphologies,id',
        ]);

        $vetement = Vetement::create($validated);

        // Retourner le vêtement avec morphology chargée
        $vetement->load('morphology');

        return response()->json($vetement, 201); // 201 Created
    }

    // 3. Afficher un vêtement spécifique avec morphology
    public function show($id)
    {
        $vetement = Vetement::with('morphology')->find($id);
        if (!$vetement) {
            return response()->json(['message' => 'Vêtement non trouvé'], 404);
        }
        return response()->json($vetement);
    }

    // 4. Mettre à jour un vêtement
    public function update(Request $request, $id)
    {
        $vetement = Vetement::find($id);
        if (!$vetement) {
            return response()->json(['message' => 'Vêtement non trouvé'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
            'morphology_id' => 'sometimes|required|exists:morphologies,id',
        ]);

        $vetement->update($validated);
        $vetement->load('morphology');

        return response()->json($vetement);
    }

    // 5. Supprimer un vêtement
    public function destroy($id)
    {
        $vetement = Vetement::find($id);
        if (!$vetement) {
            return response()->json(['message' => 'Vêtement non trouvé'], 404);
        }

        $vetement->delete();

        return response()->json(['message' => 'Vêtement supprimé avec succès']);
    }
    public function byMorphology($morphologyId)
{
    $vetements = Vetement::where('morphology_id', $morphologyId)->with('morphology')->get();
    return response()->json($vetements);
}
public function like($id)
{
    $vetement = Vetement::findOrFail($id);
    $vetement->increment('likes');
    return response()->json(['likes' => $vetement->likes]);
}

public function getByMorphology($name)
{
    $vetements = Vetement::whereHas('morphology', function ($query) use ($name) {
        $query->where('name', $name);
    })->with('morphology')->get();

    return response()->json($vetements);
}


}
