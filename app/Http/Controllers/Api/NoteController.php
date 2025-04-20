<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Note;


class NoteController extends Controller
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