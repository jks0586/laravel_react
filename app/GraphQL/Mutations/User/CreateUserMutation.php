<?php

// app/graphql/mutations/user/CreateUserMutation

namespace App\GraphQL\Mutations\User;

use App\Models\User;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;

class CreateUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createUser',
        'description' => 'Creates a user'
    ];

    public function type(): Type
    {
        return GraphQL::type('User');
    }

    public function args(): array
    {
        return [
            'name' => [
                'name' => 'name',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'email' => [
                'name' => 'email',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'avtar' => [
                'name' => 'avtar',
                'type' =>  Type::string(),
            ],
            'password' => [
                'name' => 'password',
                'type' =>  Type::nonNull(Type::string()),
            ],
            'is_admin' => [
                'name' => 'is_admin',
                'type' =>  Type::nonNull(Type::int()),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        echo '<pre>'; print_r($args);echo '</pre>'; die;
        $user = new User();
        $user->fill($args);
        $user->save();
        return $user;
    }
}
