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
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->foreignId('morphology_id')->nullable()->constrained('morphologies')->onDelete('set null');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropForeign(['morphology_id']);
        $table->dropColumn('morphology_id');
    });
}

};
