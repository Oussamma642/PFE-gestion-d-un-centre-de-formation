<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
{
    public static $wrap = false;

        /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'coefficient' => $this->coefficient,
            'masse_horaire' => $this->masse_horaire,
            'annee' => $this->annee,
            'semestre' => $this->semestre,
            'annee_scolaire' => $this->annee_scolaire,
            'filiere_id' => $this->filiere_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}


// namespace App\Http\Resources;

// use Illuminate\Http\Request;
// use Illuminate\Http\Resources\Json\JsonResource;

// class ModuleResource extends JsonResource
// {
    // /**
    //  * Transform the resource into an array.
    //  *
    //  * @return array<string, mixed>
    //  */
//     public function toArray(Request $request): array
//     {
//         return parent::toArray($request);
//     }
// }