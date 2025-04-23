<?php

namespace App\Exports;

use App\Models\Etudiant;
use App\Models\Controle;
use App\Models\Note;
use App\Models\Module;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

use App\Exports\NotesExport;
use Maatwebsite\Excel\Facades\Excel;

class NotesExport implements FromArray, WithHeadings
{
    protected $moduleId;

    public function __construct($moduleId)
    {
        $this->moduleId = $moduleId;
    }

    public function headings(): array
    {
        // Define the headings for the Excel file
        return ['Étudiant', 'Contrôle', 'Note'];
    }

    public function array(): array
    {
        // Fetch the module
        $module = Module::find($this->moduleId);

        // Fetch all controles for the module
        $controles = Controle::where('module_id', $this->moduleId)->get();

        // Fetch all notes for the module
        $notes = Note::whereIn('controle_id', $controles->pluck('id'))->get();

        // Prepare the data for export
        $data = [];
        foreach ($notes as $note) {
            $etudiant = Etudiant::find($note->etudiant_id);
            $controle = Controle::find($note->controle_id);

            $data[] = [
                'Étudiant' => $etudiant->nom . ' ' . $etudiant->prenom,
                'Contrôle' => 'Contrôle ' . $controle->numero_controle,
                'Note' => $note->note,
            ];
        }

        return $data;
    }
}