<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_product', function (Blueprint $table) {
            $table->renameColumn('quantity_sold', 'quantity_listed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_product', function (Blueprint $table) {
            $table->renameColumn('quantity_listed', 'quantity_sold');
        });
    }
};
