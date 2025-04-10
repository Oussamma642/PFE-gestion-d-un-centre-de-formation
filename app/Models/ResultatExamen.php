<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResultatExamen extends Model
{
    protected $fillable = ['examen_id', 'etudiant_id', 'note'];

    public function examen()
    {
        return $this->belongsTo(Examen::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
