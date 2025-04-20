<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

class CreateTriggerForModules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            CREATE TRIGGER create_controles_after_insert
            AFTER INSERT ON modules
            FOR EACH ROW
            BEGIN
                DECLARE i INT DEFAULT 1;
                WHILE i <= NEW.nombre_controles DO
                    INSERT INTO controles (module_id, numero_controle)
                    VALUES (NEW.id, i);
                    SET i = i + 1;
                END WHILE;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS create_controles_after_insert');
    }
}