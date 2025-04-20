<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Controle extends Model
{
    use HasFactory;
    protected $fillable = ['module_id', 'numero_controle'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }


    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}