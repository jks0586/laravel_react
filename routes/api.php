<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('auth:api')->get('/user', function(Request $request) {
//     return $request->user();
// });
Route::group(['namespace' => 'App\Http\Controllers\Apis'], function()
{
Route::post('login', 'UsersController@login')->name('login');
Route::post('register', 'UsersController@register')->name('register');
Route::get('logout', 'UsersController@logout')->name('logout');
Route::get('check-auth', 'UsersController@checkAuth')->name('check-auth');


Route::group(['middleware' => ['api']], function () {
    Route::resource('categories', 'CategoryController');
});


});




