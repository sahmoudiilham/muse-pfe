<?php
DB::table('palettes')->insert([
    [
        'skin_tone' => 'Fair',
        'skin_color' => '#ffe0bd',
        'colors' => json_encode(['#f4a261', '#e76f51', '#264653']),
        'description' => 'Teint clair: Optez pour des couleurs chaudes et vives comme l’orange et le rouge pour faire ressortir votre éclat naturel.',
    ],
    [
        'skin_tone' => 'Light',
        'skin_color' => '#ffcd94',
        'colors' => json_encode(['#2a9d8f', '#e9c46a', '#f4a261']),
        'description' => 'Teint clair lumineux: Les tons verts et jaunes apportent fraîcheur et vivacité.',
    ],
    [
        'skin_tone' => 'Medium',
        'skin_color' => '#eac086',
        'colors' => json_encode(['#8ab17d', '#cdb4db', '#e5989b']),
        'description' => 'Teint moyen: Couleurs douces et pastel sont parfaites pour un look naturel.',
    ],
    [
        'skin_tone' => 'Olive',
        'skin_color' => '#d1a77a',
        'colors' => json_encode(['#386641', '#6a994e', '#a7c957']),
        'description' => 'Teint olive: Les verts et tons terreux s’accordent parfaitement avec votre peau.',
    ],
    [
        'skin_tone' => 'Tan',
        'skin_color' => '#c68642',
        'colors' => json_encode(['#f28482', '#84a59d', '#f6bd60']),
        'description' => 'Teint bronzé: Optez pour des couleurs chaudes comme le pêche, corail et moutarde.',
    ],
    [
        'skin_tone' => 'Dark',
        'skin_color' => '#8d5524',
        'colors' => json_encode(['#f8edeb', '#ffb5a7', '#e5989b']),
        'description' => 'Teint foncé: Les tons pastel et doux apportent un beau contraste et mettent en valeur votre peau.',
    ],
]);
