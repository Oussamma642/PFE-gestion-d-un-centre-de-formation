<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyAnneeEnumInModulesTable extends Migration
{
    public function up()
    {
        Schema::table('modules', function (Blueprint $table) {
            // Modifier la colonne 'annee' (nécessite doctrine/dbal)
            $table->enum('annee', ['premiere_annee', 'deuxieme_annee'])->change();
        });
    }

    public function down()
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->enum('annee', ['première_annee', 'deuxième_annee'])->change();
        });
    }
}