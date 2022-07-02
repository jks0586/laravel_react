<?php

// app/graphql/queries/user/UserQuery

namespace App\GraphQL\Queries\User;

use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;
use Illuminate\Support\Facades\Storage;
class UserQuery extends Query
{
    protected $attributes = [
        'name' => 'user',
    ];

    public function type(): Type
    {
        return GraphQL::type('User');
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
        $user=User::findOrFail($args['id']);
        if(!empty($user->avtar)){

            $type = Storage::mimeType($user->avtar);
            $contents = Storage::get($user->avtar);
            // echo base64_encode($contents);
            $user->avtar='data:image/' . $type . ';base64,' .base64_encode($contents);
        }
        return $user;
    }
}
