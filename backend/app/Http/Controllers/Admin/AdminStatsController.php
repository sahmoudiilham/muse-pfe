<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Favori;

class AdminStatsController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $withMorphology = User::whereNotNull('morphology_id')->count();
        $withPalette = User::whereNotNull('palette_id')->count();
        $favorisCount = Favori::count();

        return response()->json([
            'total_users' => $totalUsers,
            'morphology_count' => $withMorphology,
            'palette_count' => $withPalette,
            'favoris_count' => $favorisCount,
        ]);
    }
}
