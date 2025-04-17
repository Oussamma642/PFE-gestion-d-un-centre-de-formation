<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyAnneeEtudeColumnInEtudiantsTable extends Migration
{
    public function up()
    {
        Schema::table('etudiants', function (Blueprint $table) {
            $table->dropColumn('annee_etude');
        });

        Schema::table('etudiants', function (Blueprint $table) {
            $table->enum('annee', ['premiere_annee', 'deuxieme_annee'])->after('promotion_id');
        });
    }

    public function down()
    {
        Schema::table('etudiants', function (Blueprint $table) {
            $table->dropColumn('annee');
        });

        Schema::table('etudiants', function (Blueprint $table) {
            $table->enum('annee_etude', ['1', '2'])->after('promotion_id');
        });
    }
}