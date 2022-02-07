<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeInProfessor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('professors', function (Blueprint $table) {
            $table->string("cni")->nullable();
            $table->unsignedBigInteger("professor_type_id")->nullable();
            $table->datetime("born_at")->default(now());
            $table->string("born_in")->nullable();
            $table->foreign("professor_type_id")->references("id")->on("professor_types");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('professors', function (Blueprint $table) {
            //
        });
    }
}
