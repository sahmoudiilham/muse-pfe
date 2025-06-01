<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Morphology extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image_url'];

    public function vetements()
    {
        return $this->hasMany(Vetement::class);
    }
}
