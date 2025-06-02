<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('vetements', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('image')->nullable(); // باش تخزن اسم الصورة أو مسارها
    $table->integer('likes')->default(0);
    $table->foreignId('morphology_id')->constrained('morphologies')->onDelete('cascade');
    $table->timestamps();
});


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vetements');
    }
};
