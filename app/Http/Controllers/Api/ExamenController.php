<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Module;
use App\Models\Examen;


class ExamenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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


    public function getExamensByModuleId($id)
    {
        // Find the module by ID and load the associated examens
        $module = Module::find($id);

        // Check if the module exists
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }

        // Get all examens related to the module
        return $module->examens; // This will return the collection of examens
    }   

    public function getExamensOfPremiereAnneeByFiliere($filiereId)
    {
        return Examen::with('module')
            ->whereHas('module', function($q) use ($filiereId) {
                $q->where('filiere_id', $filiereId)
                  ->where('annee', 'premiere_annee');
            })
            ->get();
    }

}