<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Palette;
use Illuminate\Http\Request;

class AdminPaletteController extends Controller
{
    public function index()
    {
        $palettes = Palette::all();
        return response()->json($palettes);
    }

    public function update(Request $request, $id)
    {
        $palette = Palette::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'colors' => 'nullable|array',
        ]);

        $palette->update($validated);

        return response()->json($palette);
    }

    public function reset()
    {
        // مثال: تمسح جميع الـ palettes و تعيد تزرع البيانات الإفتراضية (Seeder)
        Palette::truncate();
        // ممكن تعاود تشغل الـ Seeder هنا (إذا كتبتي واحد)
        // Artisan::call('db:seed', ['--class' => 'PaletteSeeder']);

        return response()->json(['message' => 'Palettes reset with default data.']);
    }
}
