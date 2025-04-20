<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('controles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')
                ->constrained('modules')
                ->onDelete('cascade');
            $table->tinyInteger('numero_controle');
            $table->timestamps();

            // Unicité pour éviter plusieurs fois le même contrôle
            $table->unique(['module_id', 'numero_controle']);
        });

    }
    public function down(): void
    {
        Schema::dropIfExists('controles');
    }
};