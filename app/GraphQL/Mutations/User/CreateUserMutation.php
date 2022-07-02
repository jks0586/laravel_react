<?php

// app/graphql/mutations/user/CreateUserMutation

namespace App\GraphQL\Mutations\User;
use Illuminate\Support\Facades\Storage;
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
                'type' =>  Type::int(),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        // echo '<pre>'; print_r($args);echo '</pre>'; die;
        if(!empty($args['avtar'])){
            $extension = explode('/', explode(':', substr($args['avtar'], 0, strpos($args['avtar'], ';')))[1])[1];
            $file_name='avtar/user-'.time().'.'.$extension;

            $data = substr($args['avtar'], strpos($args['avtar'], ',') + 1);
            $data = base64_decode($data);

            Storage::put($file_name, $data);
            $args['avtar']=$file_name;
        }
        $user = new User();
        $user->fill($args);
        $user->save();
        return $user;
    }
}
