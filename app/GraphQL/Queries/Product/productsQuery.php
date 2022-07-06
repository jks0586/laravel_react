<?php

// app/graphql/queries/Prduct/ProductsQuery

namespace App\GraphQL\Queries\User;

use App\Models\Product;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class ProductsQuery extends Query
{
    protected $attributes = [
        'name' => 'products',
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Product'));
    }

    public function resolve($root, $args)
    {
       $products=Product::all()->toArray();
       return $products;
    }
}
