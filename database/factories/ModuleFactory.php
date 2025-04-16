<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Module>
 */
class ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'libelle' => $this->faker->words(2, true), // Exemple : "Programmation Web"
            'coefficient' => $this->faker->numberBetween(1, 5),
            'masse_horaire' => $this->faker->numberBetween(20, 100),
            'annee' => 'première_annee',
            'semestre' => 'Mars',
            'annee_scolaire' => '2024',
            'filiere_id' => 1,
        ];
    }
}