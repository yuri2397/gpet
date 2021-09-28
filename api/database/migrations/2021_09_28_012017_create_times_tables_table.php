<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimesTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('times_tables', function (Blueprint $table) {
            $table->id();
            $table->time("start");
            $table->time("end");
            $table->unsignedBigInteger("classe_id");
            $table->unsignedBigInteger("day_id");
            $table->unsignedBigInteger("course_id");
            $table->unsignedBigInteger("salle_id");
            $table->unsignedBigInteger("professor_id")->nullable();

            $table->foreign("classe_id")->references("id")->on("classes");
            $table->foreign("day_id")->references("id")->on("days");
            $table->foreign("course_id")->references("id")->on("courses");
            $table->foreign("salle_id")->references("id")->on("salles");
            $table->foreign("professor_id")->references("id")->on("professors");

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
        Schema::dropIfExists('times_tables');
    }
}
