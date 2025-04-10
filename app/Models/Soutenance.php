<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soutenance extends Model
{
    protected $fillable = ['etudiant_id', 'theme', 'date_soutenance', 'note'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
