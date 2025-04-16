<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $fillable = ['libelle'];

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function etudiants()
    {
        // return $this->hasManyThrough(Etudiant::class, Promotion::class);
        return $this->hasManyThrough(Etudiant::class, Promotion::class,

            'filiere_id',   // Foreign key on promotions table
            'promotion_id', // Foreign key on etudiants table
            'id',           // Local key on filieres table
            'id'
        );
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

}