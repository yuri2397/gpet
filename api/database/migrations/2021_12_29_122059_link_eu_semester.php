<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LinkEuSemester extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('u_e_s', function (Blueprint $table) {
            $table->unsignedBigInteger("semester_id")->nullable();
            $table->foreign("semester_id")->references("id")->on("semesters")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('u_e_s', function (Blueprint $table) {
            //
        });
    }
}
