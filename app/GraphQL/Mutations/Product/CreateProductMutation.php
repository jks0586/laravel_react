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
                'type' => Type::nonNull(Type::string()),
                'description' => 'Name of the Product'
            ],
            'slug' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Slug of the Product'
            ],
            'description' => [
                'type' => Type::string(),
                'description' => 'Description of the Product'
            ],
            'image' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'image of the Product'
            ],
            'price' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'price of the Product'
            ],
            'sale_price' => [
                'type' => Type::int(),
                'description' => 'Sale price of the Product'
            ],
            'sku' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Sku of the Product'
            ],
            'quantity' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'Quantity of the Product'
            ],
            'in_stock' => [
                'type' => Type::int(),
                'description' => 'In Stock of the Product'
            ],
            'is_taxable' => [
                'type' => Type::int(),
                'description' => 'Is Taxable of the Product'
            ],
            'image' => [
                'type' => Type::string(),
                'description' => 'Image of the Product'
            ],
            'category_id' => [
                'type' => Type::int(),
                'description' => 'Category of the Product'
            ],
            'status' => [
                'type' => Type::int(),
                'description' => 'Status of the Product'
            ],
            'views' => [
                'type' => Type::int(),
                'description' => 'Views of the Product'
            ],
            'meta_title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Meta Title of the Product'
            ],
            'meta_keyword' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Meta Keyword of the Product'
            ],
            'meta_description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Meta Keyword of the Product'
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
