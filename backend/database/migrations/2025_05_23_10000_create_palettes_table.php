<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePalettesTable extends Migration
{
   public function up(): void
{
    Schema::create('palettes', function (Blueprint $table) {
        $table->id();
        $table->string('skin_tone');        // ex: Clair, Medium
        $table->string('skin_color');       // ex: #ffe0bd
        $table->json('colors');             // ex: ["#f4a261", "#e76f51", "#264653"]
        $table->text('description')->nullable(); // conseils, description courte
        $table->timestamps();
    });
}


    public function down(): void
    {
        Schema::dropIfExists('palettes');
    }
}
