<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    // public function soutenances()
    // {
    //     return $this->hasMany(Soutenance::class);
    // }
}