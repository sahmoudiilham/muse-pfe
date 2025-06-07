<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Favori;
use Illuminate\Http\Request;

class AdminFavoriController extends Controller
{
    // ترجع جميع الفافوريس
    public function index()
    {
        $favoris = Favori::all();
        return response()->json($favoris);
    }

    // تحيد واحد الفافوري
    public function destroy($id)
    {
        $favori = Favori::findOrFail($id);
        $favori->delete();

        return response()->json(null, 204);
    }
}
