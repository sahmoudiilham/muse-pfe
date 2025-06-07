<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Morphology;
use Illuminate\Http\Request;

class AdminMorphologyController extends Controller
{
    public function index()
    {
        $morphologies = Morphology::all();
        return response()->json($morphologies);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $morphology = Morphology::create($validated);

        return response()->json($morphology, 201);
    }

    public function show($id)
    {
        $morphology = Morphology::findOrFail($id);
        return response()->json($morphology);
    }

    public function update(Request $request, $id)
    {
        $morphology = Morphology::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $morphology->update($validated);

        return response()->json($morphology);
    }

    public function destroy($id)
    {
        $morphology = Morphology::findOrFail($id);
        $morphology->delete();

        return response()->json(null, 204);
    }
}
