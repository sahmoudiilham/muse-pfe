<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class GlassesController extends Controller
{
    public function index()
    {
        return Glasses::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
        ]);

        return Glasses::create($validated);
    }

    public function show(Glasses $glasses)
    {
        return $glasses;
    }

    public function update(Request $request, Glasses $glasses)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
        ]);

        $glasses->update($validated);
        return $glasses;
    }

    public function destroy(Glasses $glasses)
    {
        $glasses->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
