<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SimplifyPromotionsTable extends Migration
{
    public function up()
    {
        Schema::table('promotions', function (Blueprint $table) {
            // 1. Supprimer les colonnes redondantes
            $table->dropColumn(['libelle', 'annee_debut', 'annee_fin', 'active']);

            // 2. Ajouter la nouvelle colonne annee_scolaire
            $table->string('annee_scolaire', 9)->after('filiere_id');

            // 3. Soft deletes
            $table->softDeletes();

            // 4. Ajouter l'unicité filiere_id + annee_scolaire
            $table->unique(['filiere_id', 'annee_scolaire']);
        });
    }

    public function down()
    {
        Schema::table('promotions', function (Blueprint $table) {
            // 1. Supprimer la contrainte unique et softDeletes
            $table->dropUnique(['promotions_filiere_id_annee_scolaire_unique']);
            $table->dropSoftDeletes();

            // 2. Supprimer la colonne annee_scolaire
            $table->dropColumn('annee_scolaire');

            // 3. Récréer les colonnes d'origine
            $table->string('libelle', 100)->after('id');
            $table->year('annee_debut')->after('libelle');
            $table->year('annee_fin')->after('annee_debut');
            $table->boolean('active')->default(true)->after('filiere_id');
        });
    }
}