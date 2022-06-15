<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $user = \App\Models\User::create([
            'name' => 'jitendraadmin',
            'email' => 'jks0586@gmail.com',
            'password' => bcrypt('jks0586'),
            'is_admin' => 1
        ]);
    }
}
