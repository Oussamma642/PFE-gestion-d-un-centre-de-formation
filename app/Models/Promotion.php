<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'annee_debut',
        'annee_fin',
        'filiere_id',
        'active',
    ];

    protected $casts = [
        'annee_debut' => 'integer',
        'annee_fin'   => 'integer',
        'active'      => 'boolean',
    ];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class);
    }

    public function getAnneeEtudeAttribute()
    {
        $currentYear = now()->year;
        if ($currentYear == $this->annee_debut) {
            return '1';
        } elseif ($currentYear == $this->annee_fin) {
            return '2';
        }
        return null;
    }
}