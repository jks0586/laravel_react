<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'sale_price',
        'sku',
        'quantity',
        'in_stock',
        'is_taxable',
        'image',
        'category_id',
        'status',
        'views',
        'meta_title',
        'meta_keyword',
        'meta_description'
    ];
}
