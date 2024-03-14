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
        Schema::create('project_technology', function (Blueprint $table) {
            $table->ulid('project_id');
            $table->ulid('technology_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('technology_id')->references('id')->on('technologies')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_technology', function (Blueprint $table) {
            $table->dropForeign('project_technology_project_id_foreign');
            $table->dropForeign('project_technology_technology_id_foreign');
        });
        Schema::dropIfExists('project_technology');
    }
};
