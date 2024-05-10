<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purges', function (Blueprint $table) {
            $table->primary(['id','fase']);
            $table->timestamp('fecha_fin');
            $table->String('titulo',255);
            $table->integer('fase');
            $table->unsignedBigInteger('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purges');
    }
};
