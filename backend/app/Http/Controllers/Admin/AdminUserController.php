<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminUserController extends Controller
{
    // رجع جميع المستخدمين مع العلاقات ديالهم
    public function index()
    {
        $users = User::with(['morphology', 'palette'])->get();

        return response()->json($users);
    }

    // تحيد مستخدم
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
