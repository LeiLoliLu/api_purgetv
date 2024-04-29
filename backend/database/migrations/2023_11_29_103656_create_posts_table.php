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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->boolean('is_purged'); //true / false
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('purge_id')->references('id')->on('purges')->nullable();
            $table->timestamps(); //date
            $table->bigInteger('likeados');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
