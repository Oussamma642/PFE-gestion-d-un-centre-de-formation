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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')
                  ->constrained('etudiants')
                  ->onDelete('cascade');
            $table->foreignId('controle_id')
                  ->constrained('controles')
                  ->onDelete('cascade');
            $table->decimal('note', 4, 2);
            $table->timestamps();

            // Unicité pour éviter plusieurs notes pour un même étudiant et contrôle
            $table->unique(['etudiant_id', 'controle_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};