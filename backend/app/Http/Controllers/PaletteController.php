<?php 
namespace App\Http\Controllers;
use App\Models\Palette;
use Illuminate\Http\Request;

class PaletteController extends Controller
{
    public function index() {
        return Palette::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'colors' => 'required|array',
        ]);

        $palette = Palette::create([
            'name' => $request->name,
            'colors' => $request->colors,
            'description' => $request->description,
        ]);

        return response()->json($palette, 201);
    }

    public function show(Palette $palette) {
        return $palette;
    }

    public function update(Request $request, Palette $palette) {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'colors' => 'sometimes|array',
        ]);

        $palette->update($request->all());

        return $palette;
    }

    public function destroy(Palette $palette) {
        $palette->delete();
        return response()->json(null, 204);
    }
}