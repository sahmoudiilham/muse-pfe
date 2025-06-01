<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Palette;
use Illuminate\Http\Request;
class PaletteController extends Controller
{
    // List all palettes
    public function index()
    {
        return response()->json(Palette::all());
    }
    


    // Show one palette
    public function show($id)
    {
        $palette = Palette::find($id);
        if (!$palette) {
            return response()->json(['message' => 'Palette not found'], 404);
        }
        return response()->json($palette);
    }

    // Store new palette
    public function store(Request $request)
    {
        $request->validate([
            'skin_tone' => 'required|string|max:255',
            'skin_color' => 'required|string|regex:/^#([A-Fa-f0-9]{6})$/',
            'colors' => 'required|array|min:1',
            'colors.*' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6})$/'],
            'description' => 'nullable|string',
        ]);

        $palette = Palette::create($request->all());

        return response()->json($palette, 201);
    }

    // Update palette
    public function update(Request $request, $id)
    {
        $palette = Palette::find($id);
        if (!$palette) {
            return response()->json(['message' => 'Palette not found'], 404);
        }

        $request->validate([
            'skin_tone' => 'sometimes|required|string|max:255',
            'skin_color' => 'sometimes|required|string|regex:/^#([A-Fa-f0-9]{6})$/',
            'colors' => 'sometimes|required|array|min:1',
            'colors.*' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6})$/'],
            'description' => 'nullable|string',
        ]);

        $palette->update($request->all());

        return response()->json($palette);
    }

    // Delete palette
    public function destroy($id)
    {
        $palette = Palette::find($id);
        if (!$palette) {
            return response()->json(['message' => 'Palette not found'], 404);
        }
        $palette->delete();
        return response()->json(['message' => 'Palette deleted']);
    }
}
