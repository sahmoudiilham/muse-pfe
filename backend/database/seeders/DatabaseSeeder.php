<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
{
    $this->call([
        PaletteSeeder::class,
        MorphologySeeder::class,
        VetementSeeder::class,
        
    ]);
}

}
