<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTriggerForExamensAfterModuleInsert extends Migration
{
    public function up()
    {
        // Supprime d'abord l'ancien trigger s'il existe (sécurité)
        DB::unprepared('DROP TRIGGER IF EXISTS create_examens_after_module_insert;');

        // Crée le nouveau trigger
        DB::unprepared("
            CREATE TRIGGER create_examens_after_module_insert
            AFTER INSERT ON `modules`
            FOR EACH ROW
            BEGIN
                -- Examen théorique
                INSERT INTO `examens` 
                    (`type`, `module_id`, `annee_scolaire`, `created_at`, `updated_at`)
                VALUES 
                    ('theorique', NEW.id, NEW.annee_scolaire, NOW(), NOW()),
                    ('pratique', NEW.id, NEW.annee_scolaire, NOW(), NOW());
            END;
        ");
    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS create_examens_after_module_insert;');
    }
}