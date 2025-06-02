<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VetementSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vetements')->insert([
            [
                'name' => 'Robe élégante',
                'image' => 'vetements/robe_elegante.jpg',
                'morphology_id' => 4, // sablier
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jean slim',
                'image' => 'vetements/jean_slim.jpg',
                'morphology_id' => 1, // rectangle
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chemise ample',
                'image' => 'vetements/chemise_ample.jpg',
                'morphology_id' => 2, // poire
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // zid chwiya outfits okhrin ...
        ]);
    }
}
