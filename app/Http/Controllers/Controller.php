<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public $limit=10;
    public $data = [];
    public $errors;
    public $message = '';
    public $state='';
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function response($status = true)
    {
        $errors = [];
        if (!empty($this->errors)) {
            foreach ($this->errors->toArray() as $key => $value) {
                $errors[$key] = $value[0];
            }
            $status = false;
        }
        return response()->json([
            'status_code' => 200,
            'status' => $status,
            'errors' => $errors,
            'message' => $this->message,
            'data' => $this->data,
            'state'=>false,
        ]);
    }

}
