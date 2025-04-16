<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EtudiantResource extends JsonResource
{
    public static $wrap = false; // Pour ne pas avoir de clé "data"

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
            'matricule' => $this->matricule,
            'filiere_id' => $this->filiere_id,
            'promotion_id' => $this->promotion_id,
            'annee_etude' => $this->annee_etude,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}