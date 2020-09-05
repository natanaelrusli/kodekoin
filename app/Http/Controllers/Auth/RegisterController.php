<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'phone' => ['required', 'string', 'min:8', 'max:15', 'unique:users,phone'],
            'password'  => ['required', 'string', 'min:6']
        ]);

        $errors = $validatedData->errors();
        if ($errors->get('email')) {
            return response()->json(["status" => "failed", "message" => "Email error", "errors" => $validatedData->errors()]);
        }
        if ($errors->get('password')) {
            return response()->json(["status" => "failed", "message" => "Password error", "errors" => $validatedData->errors()]);
        }
        if ($errors->get('phone')) {
            return response()->json(["status" => "failed", "message" => "Phone duplicate", "errors" => $validatedData->errors()]);
        }
        if ($validatedData->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation Error", "errors" => $validatedData->errors()]);
        }

        $name = $request->name;
        $name = explode(" ", $name);
        $first_name = $name[0];
        $last_name = "";

        if (isset($name[1])) {
            $last_name = $name[1];
        }

        User::create([
            'full_name' => $request->name,
            'last_name' => $last_name,
            'first_name' => $first_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(["status" => 200, 'message' => 'You\'re now registered!']);
    }
}
