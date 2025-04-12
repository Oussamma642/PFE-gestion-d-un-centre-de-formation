<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soutenance extends Model
{
    use HasFactory;
    protected $fillable = ['etudiant_id', 'module_id', 'theme', 'date_soutenance', 'note'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}