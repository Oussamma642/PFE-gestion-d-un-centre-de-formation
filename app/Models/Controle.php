<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Controle extends Model
{
    use HasFactory;
    protected $fillable = ['filiere_id', 'module_id', 'numero_controle', 'note', 'annee_scolaire'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}