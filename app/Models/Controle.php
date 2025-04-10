<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Controle extends Model
{
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
