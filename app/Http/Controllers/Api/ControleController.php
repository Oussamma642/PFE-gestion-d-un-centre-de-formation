<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Module;

use App\Models\Controle;

class ControleController extends Controller
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


    public function getControlesByModuleId($id)
    {
        // Find the module by ID and load the associated controles
        $module = Module::find($id);
    
        // Check if the module exists
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }
    
        // Get all controles related to the module
        return $module->controles; // This will return the collection of controles
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

    public function getControlesOfPremiereAnneeByFiliere($filiereId){
        return Controle::with('module')
        ->whereHas('module', function($q) use ($filiereId) {
            $q->where('filiere_id', $filiereId)
              ->where('annee', 'premiere_annee');
        })
        ->get();
    }

}