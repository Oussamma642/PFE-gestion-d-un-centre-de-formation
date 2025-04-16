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
        return $this->hasManyThrough(Etudiant::class, Promotion::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

}