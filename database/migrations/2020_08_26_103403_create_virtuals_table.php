<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVirtualsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('virtuals', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_closed');
            $table->string('status');
            $table->string('currency');
            $table->string('owner_id');
            $table->string('external_id');
            $table->string('bank_code');
            $table->string('merchant_code');
            $table->string('name');
            $table->string('account_number');
            $table->boolean('is_single_use');
            $table->string('id_va');
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
        Schema::dropIfExists('virtuals');
    }
}
