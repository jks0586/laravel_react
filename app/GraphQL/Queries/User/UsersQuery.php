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
        $users=User::all();
        // $users.each(function ($user, $key) {
        //     if(!empty($user) && $key=='avtar'){
        //         return $user;
        //         // $type = Storage::mimeType($user->avtar);
        //         // $contents = Storage::get($user->avtar);

        //         // $user->avtar='data:image/' . $type . ';base64,' .base64_encode($contents);
        //     }
        // });
        return $users;
    }
}
