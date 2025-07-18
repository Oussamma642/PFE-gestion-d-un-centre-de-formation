<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('examens', function (Blueprint $table) {
            $table->id();
            // Type d'examen : 'theorique' ou 'pratique'
            $table->enum('type', ['theorique', 'pratique']);
            
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            // Référence au module concerné
            $table->foreignId('module_id')->constrained('modules')->onDelete('cascade');
            // Année scolaire sous le format 'YYYY-YYYY'
            $table->string('annee_scolaire', 9);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examens');
    }
};