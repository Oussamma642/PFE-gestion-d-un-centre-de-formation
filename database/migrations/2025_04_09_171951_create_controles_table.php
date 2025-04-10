
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('controles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('filiere_id')->constrained('filieres')->onDelete('cascade');
            $table->foreignId('module_id')->constrained('modules')->onDelete('cascade'); // Vérifie le type de colonne
            $table->integer('numero_controle');
            $table->decimal('note', 4, 2)->notNullable();
            $table->string('annee_scolaire', 9);
            $table->timestamps();
        });
    }        
    public function down(): void
    {
        Schema::dropIfExists('controles');
    }
};
