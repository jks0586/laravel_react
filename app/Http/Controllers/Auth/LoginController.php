<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout','checkAuth');
    }


    public function login(Request $request)
    {
        // echo '<pre>';print_r($request->all()); echo '</pre>';die;
        // $credentials = $request->only('email', 'password');

        $credentials = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $api_token = Str::random(60);
            $user->api_token = $api_token;
            $user->save();
            return response()->json(['user' => $user->toArray()]);
        }
        // return $this->sendFailedLoginResponse($request);
        // $err=$this->validateLogin($request);
        // if ($this->attemptLogin($request)) {
        //     $user = Auth::user();
        //     echo '<pre>';print_r($user); echo '</pre>';die;
        //     $api_token = Str::random(60);
        //     $user->api_token = $api_token;
        //     $user->save();
        //     return response()->json(['user' => $user->toArray()]);
        // } die('yyyy');
        // return $this->sendFailedLoginResponse($request);
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            $user->api_token = null;
            $user->save();
            return response()->json(['data' => 'User logged out.'], 200);
        }
        return response()->json(['state' => 0, 'message' => 'Unauthenticated'], 401);
    }


    public function checkAuth(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($user && $user->is_admin) {
            return response()->json(['state' => 1], 200);
        }
        return response()->json(['state' => 0], 401);
    }


}
