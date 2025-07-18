<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Note extends Model
{
    use HasFactory;

    protected $fillable = ['etudiant_id', 'controle_id', 'note'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function controle()
    {
        return $this->belongsTo(Controle::class);
    }
}