<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Examen extends Model
{

    use HasFactory;
    
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