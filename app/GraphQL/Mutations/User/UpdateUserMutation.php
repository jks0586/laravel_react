<?php

// app/graphql/mutations/user/UpdateUserMutation

namespace App\GraphQL\Mutations\User;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'updateUser',
        'description' => 'Updates a User'
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
                'type' =>  Type::nonNull(Type::int()),
            ],
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
                'type' =>  Type::string(),
            ],
            'is_admin' => [
                'name' => 'is_admin',
                'type' =>  Type::int(),
            ],
        ];
    }

    public function resolve($root, array $args)
    {
        // echo '<pre>';
        // print_r($root);
        if(!empty($args['avtar'])){
            $extension = explode('/', explode(':', substr($args['avtar'], 0, strpos($args['avtar'], ';')))[1])[1];
            $file_name='avtar/user-'.time().'.'.$extension;

            $data = substr($args['avtar'], strpos($args['avtar'], ',') + 1);
            $data = base64_decode($data);

            Storage::put($file_name, $data);
            $args['avtar']=$file_name;
        }

        // echo '<pre>';
        // print_r($args);
        // echo '</pre>';

        $User = User::findOrFail($args['id']);

        $User->fill($args);
        $User->save();

        return $User;
    }
}
