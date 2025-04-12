<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'prenom', 'email', 'filiere_id'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function soutenance()
    {
        return $this->hasOne(Soutenance::class);
    }

    public function examens()
    {
        return $this->hasMany(Examen::class);
    }

    public function resultatExamens()
    {
        return $this->hasMany(ResultatExamen::class);
    }

    public function controles()
    {
        return $this->hasMany(Controle::class);
    }
}