<?php

// app/graphql/types/CategoryType 

namespace App\GraphQL\Types;

use App\Models\User;
use App\Models\Category;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class CategoryType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Category',
        'description' => 'Collection of category',
        'model' => Category::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of Category'
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Title of the Category'
            ],
            'image' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Image of the Category'
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Description Of category'
            ],
            'slug' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Slug Of category'
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Created Of category'
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Updated Of category'
            ],
        ];
    }
}