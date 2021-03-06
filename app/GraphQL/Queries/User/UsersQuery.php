<?php

// app/graphql/queries/user/UserQuery

namespace App\GraphQL\Queries\User;

use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class UsersQuery extends Query
{
    protected $attributes = [
        'name' => 'users',
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('User'));
    }

    public function resolve($root, $args)
    {
       $users=User::all()->toArray();
    //    $users->append('avtarimage');

        // echo '<pre>';
        // print_r($users);
        // echo '</pre>';; die;
       return $users;
    }
}
