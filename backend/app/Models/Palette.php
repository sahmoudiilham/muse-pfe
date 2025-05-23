<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
namespace App\Models;


class Palette extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'colors',
        'description'
    ];

    protected $casts = [
        'colors' => 'array',
    ];
}

