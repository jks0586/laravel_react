<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->text('description');
            $table->double('price',15,2)->default('0.00');
            $table->double('sale_price',15,2)->default('0.00');
            $table->string('sku');
            $table->integer('quantity');
            $table->tinyInteger('in_stock');
            $table->tinyInteger('is_taxable');
            $table->string('image');
            $table->string('category_id');
            $table->enum('status', ['publish', 'draft'])->default('draft');
            $table->bigInteger('views');
            $table->string('meta_title');
            $table->string('meta_keyword');
            $table->string('meta_description');
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
        Schema::dropIfExists('products');
    }
}
