<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MorphologySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('morphologies')->insert([
            [
                'name' => 'Rectangle',
                'description' => 'Épaules, taille et hanches ont à peu près la même largeur.',
                'image_url' => 'morphologies/rectangle.jpg',
            ],
            [
                'name' => 'Poire',
                'description' => 'Hanches plus larges que les épaules.',
                'image_url' => 'morphologies/pear.jpg',
            ],
            [
                'name' => 'Triangle inversé',
                'description' => 'Épaules larges, hanches plus étroites.',
                'image_url' => 'morphologies/inverted_triangle.jpg',
            ],
            [
                'name' => 'Sablier',
                'description' => 'Épaules et hanches équilibrées avec une taille marquée.',
                'image_url' => 'morphologies/hourglass.jpg',
            ],
            [
                'name' => 'Pomme',
                'description' => 'Forme arrondie avec une taille peu marquée.',
                'image_url' => 'morphologies/apple.jpg',
            ],
        ]);
    }
}
