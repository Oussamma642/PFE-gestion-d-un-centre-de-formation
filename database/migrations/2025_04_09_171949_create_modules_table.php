<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id(); // Cela crée une colonne unsigned bigInteger
            
            $table->string('libelle', 100);
            $table->integer('coefficient');
            $table->integer('masse_horaire');
            $table->enum('annee', ['première_annee', 'deuxième_annee']);
            $table->enum('semestre', ['Mars', 'Juillet']);
            $table->string('annee_scolaire', 9);
            $table->foreignId('filiere_id')->constrained('filieres');
            $table->timestamps();
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};