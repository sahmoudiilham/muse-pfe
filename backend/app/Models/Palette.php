<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Palette extends Model
{
    protected $fillable = [
        'skin_tone',
        'skin_color',
        'colors',
        'description'
    ];

    protected $casts = [
        'colors' => 'array',   // Cast JSON to array automatically
    ];
}
