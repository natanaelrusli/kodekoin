<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $email_status = User::where("email", $request->email)->first();

        if (is_null($email_status)) {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        } else if (!$token = auth()->attempt($request->only('email', 'password'))) {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
        }
        // dd($token);
        $user = $this->userDetail($request->email);
        return response()->json(['message' => 'You\'re logged in successfully!', 'data' => $user, 'token' => $token]);
    }
    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = User::where("email", $email)->first();
            return $user;
        }
    }
}
