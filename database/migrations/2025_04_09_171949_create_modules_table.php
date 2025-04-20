<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('filiere_id')
                  ->constrained('filieres')
                  ->onDelete('cascade');
            $table->string('libelle', 100);
            $table->integer('coefficient');
            $table->integer('masse_horaire');
            $table->enum('annee', ['premiere_annee', 'deuxieme_annee']);
            $table->enum('semestre', ['Mars', 'Juillet']);
            $table->string('annee_scolaire', 9);
            $table->integer('nombre_controles')->default(1);
            $table->timestamps();
            // Optionnel : éviter les doublons de modules dans une même filière et année
            $table->unique(['filiere_id', 'libelle', 'annee_scolaire']);
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};