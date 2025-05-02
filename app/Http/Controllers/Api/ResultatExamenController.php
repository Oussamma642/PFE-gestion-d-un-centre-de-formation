<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResultatExamen;
use App\Models\Examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ResultatExamenController extends Controller
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
        // Log the incoming request for debugging
        Log::info('Incoming request:', $request->all());

        $validated = $request->validate([
            '*.etudiant_id' => 'required|exists:etudiants,id',
            '*.examen_id' => 'required|exists:examens,id', // Corrected table name
            '*.note'        => 'required|numeric|min:0|max:20',
        ]);

        foreach ($validated as $note) {
            ResultatExamen::updateOrCreate(
                ['etudiant_id' => $note['etudiant_id'], 'examen_id' => $note['examen_id']],
                ['note' => $note['note']]
            );
        }

        return response()->json(['message' => 'Notes saved successfully!']);

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

    public function getNotesByModuleId($moduleId)
    {
        // Fetch all examens for the given module
        $examens = Examen::where('module_id', $moduleId)->pluck('id');

        // Fetch all notes for the examens in the module
        $notes = ResultatExamen::whereIn('examen_id', $examens)->get();

        return response()->json($notes);
    }

}