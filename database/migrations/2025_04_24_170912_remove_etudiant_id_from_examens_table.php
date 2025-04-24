<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveEtudiantIdFromExamensTable extends Migration
{
    public function up()
    {
        Schema::table('examens', function (Blueprint $table) {
            // 1) Supprimer d'abord la contrainte de clé étrangère
            $table->dropForeign(['etudiant_id']);
            // 2) Puis supprimer la colonne
            $table->dropColumn('etudiant_id');
        });
    }

    public function down()
    {
        Schema::table('examens', function (Blueprint $table) {
            // 1) Réajouter la colonne
            $table->foreignId('etudiant_id')
                  ->after('type')              // place-la juste après 'type' si tu veux conserver l'ordre
                  ->constrained('etudiants')  // référence la table etudiants
                  ->onDelete('cascade');      // même comportement qu'avant
        });
    }
}