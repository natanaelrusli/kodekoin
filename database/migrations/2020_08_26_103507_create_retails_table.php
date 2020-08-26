<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('retails', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_single_use');
            $table->string('status');
            $table->string('owner_id');
            $table->string('external_id');
            $table->string('retail_outlet_name');
            $table->string('prefix');
            $table->string('name');
            $table->string('payment_code');
            $table->string('type');
            $table->integer('expected_amount');
            $table->string('expiration_date');
            $table->string('id_retail');
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
        Schema::dropIfExists('retails');
    }
}
