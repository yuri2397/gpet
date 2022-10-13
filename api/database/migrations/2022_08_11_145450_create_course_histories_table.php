<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("course_id");
            $table->foreign("course_id")->references("id")->on("courses");

            $table->unsignedBigInteger("course_status_id");
            $table->foreign("course_status_id")->references("id")->on("course_status");

            $table->unsignedBigInteger("professor_id");
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
        Schema::dropIfExists('course_histories');
    }
}
