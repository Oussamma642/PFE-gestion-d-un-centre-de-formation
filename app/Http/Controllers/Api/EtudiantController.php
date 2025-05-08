<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Etudiant;

use App\Http\Resources\EtudiantResource;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etudiants = Etudiant::all();
        return EtudiantResource::collection($etudiants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function showByAnneeFiliere($annee, $filiere)
    {
        $etudiants = Etudiant::where('annee', $annee)->where('filiere_id', $filiere)->get();

        if ($etudiants->isEmpty()) {
            return response()->json(['message' => 'Aucun module trouvé pour cette année et cette filière.'], 404);
        }

        return response()->json($etudiants);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    
    // --------- GET Student Infos, his filiere and promotions
    public function getEtudiantPersonalInfos($id, $filiere)
    {
        $etudiant = Etudiant::with(['filiere', 'promotion'])
        ->where('id', $id)
        ->where('filiere_id', $filiere)
        ->first();
        
        return \response()->json($etudiant);
    }
}