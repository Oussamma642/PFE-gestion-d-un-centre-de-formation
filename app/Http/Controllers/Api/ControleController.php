<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Controle;
use App\Models\Etudiant;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControleController extends Controller
{
    public function getEtudiantsByModule($moduleId)
    {
        $module    = Module::findOrFail($moduleId);
        $etudiants = Etudiant::where('filiere_id', $module->filiere_id)
            ->where('promotion_id', $module->promotion_id)
            ->get();

        return response()->json($etudiants);
    }

    public function getControlesByModule($moduleId)
    {
        $controles = Controle::where('module_id', $moduleId)
            ->orderBy('etudiant_id')
            ->orderBy('numero_controle')
            ->get();

        return response()->json($controles);
    }

    public function initializeControles(Request $request)
    {
        $request->validate([
            'module_id'                   => 'required|exists:modules,id',
            'controles'                   => 'required|array',
            'controles.*.etudiant_id'     => 'required|exists:etudiants,id',
            'controles.*.numero_controle' => 'required|integer|min:1|max:4',
        ]);

        try {
            DB::beginTransaction();

            $module = Module::findOrFail($request->module_id);

            foreach ($request->controles as $controleData) {
                Controle::create([
                    'etudiant_id'     => $controleData['etudiant_id'],
                    'module_id'       => $module->id,
                    'filiere_id'      => $module->filiere_id,
                    'numero_controle' => $controleData['numero_controle'],
                    'note'            => null,
                    'annee_scolaire'  => $module->annee_scolaire,
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Contrôles initialisés avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erreur lors de l\'initialisation des contrôles'], 500);
        }
    }

    public function saveNote(Request $request)
    {
        $request->validate([
            'etudiant_id' => 'required|exists:etudiants,id',
            'controle_id' => 'required|exists:controles,id',
            'note'        => 'required|numeric|min:0|max:20',
        ]);

        try {
            $controle = Controle::findOrFail($request->controle_id);
            $controle->update(['note' => $request->note]);

            return response()->json(['message' => 'Note enregistrée avec succès']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de l\'enregistrement de la note'], 500);
        }
    }
}