<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesHasProfessorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses_has_professors', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("hours");
            $table->date("date");
            $table->unsignedInteger("amount")->default(0);
            $table->unsignedBigInteger("course_id");
            $table->unsignedBigInteger("professor_id");
            $table->foreign("course_id")->references("id")->on("courses");
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
        Schema::dropIfExists('courses_has_professors');
    }
}
