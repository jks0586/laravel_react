<?php

// app/graphql/queries/Prduct/ProductQuery

namespace App\GraphQL\Queries\Product;

use App\Models\Product;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Storage;
class ProductQuery extends Query
{
    protected $attributes = [
        'name' => 'Product',
    ];

    public function type(): Type
    {
        return GraphQL::type('Product');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        $product=Product::findOrFail($args['id']);
        if(!empty($product->image)){

            $type = Storage::mimeType($product->image);
            $contents = Storage::get($product->image);
            // echo base64_encode($contents);
            $product->avtar='data:image/' . $type . ';base64,' .base64_encode($contents);
        }
        return $product;
    }
}
