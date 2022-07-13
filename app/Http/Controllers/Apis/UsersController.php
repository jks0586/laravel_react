<?php

namespace App\Http\Controllers\Apis;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{


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
        // print_r($user); die;
        if ($user && $user->is_admin) {
            $this->state=1;
            return $this->response();
            // return response()->json(['state' => 1], 200);
        }
        $this->state=0;
        $this->status_code=401;
        return $this->response();
    }


    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users|max:191',
            'email' => 'required|email|unique:users|max:191',
            'password' => 'required|min:6|max:15',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $user = User::create([
            'name' => strtolower($request->username),
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        Auth::login($user);
        $token = $user->createToken(microtime())->accessToken;
        $this->data['token'] = $token;
        $this->data['user'] = new UserResource($user);
        return $this->response();
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
        // $this->data['pp'] = bcrypt('jks0586');
        if ($validator->fails()) {
            $this->errors = $validator->errors();
            return $this->response();
        }

        $credentials = $request->only('email', 'password');

        $auth = Auth::guard('web')->attempt($credentials);

        if (!$auth) {
            $this->message = "Invalid Login";
            return $this->response();
        }

        $user = Auth::guard('web')->user();

        $token = $user->createToken(microtime())->accessToken;
        $usera=User::find($user->id);
        $usera->api_token=$token;
        $usera->save();

        $this->data['user'] = new UserResource($usera);
        $this->data['token'] = $token;
        
        return $this->response();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
