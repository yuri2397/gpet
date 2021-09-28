<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateECSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('e_c_s', function (Blueprint $table) {
            $table->id();
            $table->string("code")->unique();
            $table->string("name")->nullable();
            $table->unsignedBigInteger("ue_id")->nullable();
            $table->foreign("ue_id")->references("id")->on("u_e_s");
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
        Schema::dropIfExists('e_c_s');
    }
}
