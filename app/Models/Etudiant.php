<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'matricule',
        'filiere_id',
        'promotion_id',
        'annee_etude',
    ];

    protected $casts = [
        'annee_etude' => 'string',
    ];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function soutenances()
    {
        return $this->hasMany(Soutenance::class);
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