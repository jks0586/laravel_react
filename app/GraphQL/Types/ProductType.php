<?php

// app/graphql/types/CategoryType

namespace App\GraphQL\Types;

use App\Models\Product;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class ProductType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Product',
        'description' => 'Collection of Products',
        'model' => Product::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of Product'
            ],
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
                'type' => Type::nonNull(Type::float()),
                'description' => 'price of the Product'
            ],
            'sale_price' => [
                'type' => Type::float(),
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
                'type' => Type::boolean(),
                'description' => 'In Stock of the Product'
            ],
            'is_taxable' => [
                'type' => Type::boolean(),
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
            ]
        ];
    }
}