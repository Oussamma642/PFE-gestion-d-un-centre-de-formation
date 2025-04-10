<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $fillable = ['type', 'module_id', 'annee_scolaire'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function resultatExamens()
    {
        return $this->hasMany(ResultatExamen::class);
    }
}
