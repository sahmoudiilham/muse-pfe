<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       User::create([
        'name' => 'Admin',
        'email' => 'admin@example.com',
        'password' => bcrypt('password')]);
    }
    // database/seeders/DatabaseSeeder.php



}
