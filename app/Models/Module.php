<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Module extends Model
{
    use HasFactory;

    protected $fillable = ['libelle', 'coefficient', 'annee', 'semestre', 'annee_scolaire', 'filiere_id'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function controles()
    {
        return $this->hasMany(Controle::class);
    }

    public function examens()
    {
        return $this->hasMany(Examen::class);
    }
}