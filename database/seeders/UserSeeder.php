<?php

// namespace Database\Seeders;

// use Illuminate\Database\Seeder;

// class UserSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         //
//     }
// }

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'     => 'admin2', // Replace with desired name
            'email'    => 'admin2@gmail.com', // Replace with desired email
            'password' => Hash::make('1234'), // Hash the password
        ]);
    }
}