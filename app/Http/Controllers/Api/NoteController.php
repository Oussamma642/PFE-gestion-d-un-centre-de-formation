<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\Controle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::all();
        return response()->json($notes);
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
            '*.controle_id' => 'required|exists:controles,id',
            '*.note'        => 'required|numeric|min:0|max:20',
        ]);

        foreach ($validated as $note) {
            Note::updateOrCreate(
                ['etudiant_id' => $note['etudiant_id'], 'controle_id' => $note['controle_id']],
                ['note' => $note['note']]
            );
        }

        return response()->json(['message' => 'Notes saved successfully!']);
    }

    public function getNotesByModuleId($moduleId)
    {
        // Fetch all controles for the given module
        $controles = Controle::where('module_id', $moduleId)->pluck('id');

        // Fetch all notes for the controles in the module
        $notes = Note::whereIn('controle_id', $controles)->get();

        return response()->json($notes);
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
}