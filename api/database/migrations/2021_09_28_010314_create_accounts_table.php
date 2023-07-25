<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string("rip")->unique();
            $table->string("account_number");
            $table->string("key");
            $table->unsignedBigInteger("professor_id");
            $table->unsignedBigInteger("bank_id")->nullable();

            $table->foreign("professor_id")->references("id")->on("professors");
            $table->foreign("bank_id")->references("id")->on("banks");
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
        Schema::dropIfExists('accounts');
    }
}
