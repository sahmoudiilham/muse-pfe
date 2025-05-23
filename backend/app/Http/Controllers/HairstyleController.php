<?php

namespace App\Http\Controllers;

use App\Models\Hairstyle;
use Illuminate\Http\Request;
class HairstyleController extends Controller
{
    public function index()
    {
        return Hairstyle::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
        ]);

        return Hairstyle::create($validated);
    }

    public function show(Hairstyle $hairstyle)
    {
        return $hairstyle;
    }

    public function update(Request $request, Hairstyle $hairstyle)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
        ]);

        $hairstyle->update($validated);
        return $hairstyle;
    }

    public function destroy(Hairstyle $hairstyle)
    {
        $hairstyle->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
