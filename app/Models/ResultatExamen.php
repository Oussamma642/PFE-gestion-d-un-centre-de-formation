<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ResultatExamen extends Model
{
    use HasFactory;
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