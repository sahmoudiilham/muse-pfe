<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vetement extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image', 'morphology_id'];

    public function morphology()
    {
        return $this->belongsTo(Morphology::class);
    }

    public function favoris()
    {
        return $this->hasMany(Favori::class);
    }
}