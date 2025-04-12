<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Soutenance extends Model
{
    use HasFactory;
    protected $fillable = ['etudiant_id', 'theme', 'date_soutenance', 'note'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}