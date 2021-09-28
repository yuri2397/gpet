<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string("acronym");
            $table->string("name");
            $table->unsignedInteger("groupe_number")->default(0);

            $table->unsignedBigInteger("classe_id");
            $table->unsignedBigInteger("semester_id");
            $table->unsignedBigInteger("service_id");
            $table->unsignedBigInteger("ec_id");
            $table->unsignedBigInteger("professor_id")->nullable();

            $table->foreign("classe_id")->references("id")->on("classes");
            $table->foreign("semester_id")->references("id")->on("semesters");
            $table->foreign("service_id")->references("id")->on("services");
            $table->foreign("ec_id")->references("id")->on("e_c_s");
            $table->foreign("professor_id")->references("id")->on("professors")->onDelete("set null");

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
        Schema::dropIfExists('courses');
    }
}
