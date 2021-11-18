<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSallesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salles', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable();
            $table->integer("number")->nullable();
            $table->integer("capacity")->default(0);

            $table->unsignedBigInteger('batiment_id')->nullable();
            $table->unsignedBigInteger('departement_id')->nullable();

            $table->foreign("batiment_id")->references("id")->on("batiments");
            $table->foreign("departement_id")->references("id")->on("departements");

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
        Schema::dropIfExists('salles');
    }
}
