<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs pouvant être remplis en masse.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // ✅ ضفنا role
    ];

    /**
     * Les attributs cachés dans les réponses JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Les attributs castés automatiquement.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * ✅ Les attributs à ajouter automatiquement à la réponse JSON.
     */
    protected $appends = ['role'];

    /**
     * ✅ Accessor pour retourner role (مهم باش يبانو فـ /api/user)
     */
    
    /**
     * ✅ Vérifie si l'utilisateur est admin
     */
    public function isAdmin()
    {
        return $this->is_admin == 1;
    }

    // ✅ Relations
    public function morphologie()
    {
        return $this->belongsTo(Morphology::class);
    }

    public function palette()
    {
        return $this->belongsTo(Palette::class);
    }

    public function favoris()
    {
        return $this->hasMany(Favori::class);
    }

    public function visage()
    {
        return $this->hasOne(Visage::class);
    }

    // يمكنك حذف هذه السطرين إذا لم تكن تقوم بأي تغيير خاص:


public function getRoleAttribute()
{
    return $this->attributes['role'];
}


}
