<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateEwalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ewallets', function (Blueprint $table) {
            $table->longText('checkout_url')->nullable()->change();
            $table->string('business_id')->nullable()->change();
            $table->string('status')->nullable()->change();
            $table->string('phone')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ewallets', function (Blueprint $table) {
            $table->string('business_id')->change();
            $table->string('status')->change();
            $table->string('phone')->change();
        });
    }
}
