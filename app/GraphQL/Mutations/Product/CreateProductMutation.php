<?php

// app/graphql/mutations/product/CreateProductMutation

namespace App\GraphQL\Mutations\Product;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;

class CreateProductMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createProduct',
        'description' => 'Creates a Product'
    ];

    public function type(): Type
    {
        return GraphQL::type('Product');
    }

    public function args(): array
    {
        return [
            'name' => [
                'name' => 'name',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'slug' => [
                'name' => 'slug',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'description' => [
                'name' => 'description',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'price' => [
                'name' => 'price',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'sale_price' => [
                'name' => 'sale_price',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'sku' => [
                'name' => 'sku',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'quantity' => [
                'name' => 'quantity',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'in_stock' => [
                'name' => 'in_stock',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'is_taxable' => [
                'name' => 'is_taxable',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'image' => [
                'name' => 'image',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'category_id' => [
                'name' => 'category_id',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'status' => [
                'name' => 'status',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'views' => [
                'name' => 'views',
                'type' =>  Type::nonNull(Type::int()),
            ],
            'meta_title' => [
                'name' => 'meta_title',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'meta_keyword' => [
                'name' => 'meta_keyword',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'meta_description' => [
                'name' => 'meta_description',
                'type' =>  Type::nonNull(Type::string()),
            ],
           
        ];
    }

    public function resolve($root, $args)
    {
        // echo '<pre>'; print_r($args);echo '</pre>'; die;
        if(!empty($args['image'])){
            $extension = explode('/', explode(':', substr($args['image'], 0, strpos($args['image'], ';')))[1])[1];
            $file_name='product/product-'.time().'.'.$extension;

            $data = substr($args['image'], strpos($args['image'], ',') + 1);
            $data = base64_decode($data);

            Storage::put($file_name, $data);
            $args['image']=$file_name;
        }
        $product = new Product();
        $product->fill($args);
        $product->save();
        return $product;
    }
}
