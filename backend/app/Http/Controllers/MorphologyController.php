<?php
namespace App\Http\Controllers;

use App\Models\Morphology;
use Illuminate\Http\Request;

class MorphologyController extends Controller
{
    public function index()
    {
        return Morphology::all();
    }

    public function show(Morphology $morphology)
    {
        return $morphology;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        return Morphology::create($validated);
    }

    public function update(Request $request, Morphology $morphology)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $morphology->update($validated);
        return $morphology;
    }

    public function destroy(Morphology $morphology)
    {
        $morphology->delete();
        return response()->json(['message' => 'Supprimée avec succès']);
    }
}
