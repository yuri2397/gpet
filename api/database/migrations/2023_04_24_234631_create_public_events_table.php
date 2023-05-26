<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublicEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('public_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('summary');
            $table->longText('innerContent')->nullable();
            $table->timestamp('start')->default(now());
            $table->timestamp('end');
            $table->string("logo")->nullable();
            $table->boolean("scrollable")->default(true);
            $table->boolean("fullscreen")->default(false);
            $table->boolean("allDay")->default(true);
            $table->unsignedInteger("scrollTime")->default(10);
            $table->enum('type', ['image', 'video', 'text'])->default('text');
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
        Schema::dropIfExists('public_events');
    }
}
