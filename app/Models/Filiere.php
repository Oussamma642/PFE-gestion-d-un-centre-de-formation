<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Filiere extends Model
{
    use HasFactory;

    protected $fillable = ['libelle'];

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function controles()
    {
        return $this->hasMany(Controle::class);
    }
}