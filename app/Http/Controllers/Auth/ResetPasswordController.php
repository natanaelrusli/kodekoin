<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        // dd(auth()->user()->password, $request->passold, $user->password);
        if (Hash::check($request->passold, $user->password)) {
            User::where("email", $request->email)->update([
                'password' => bcrypt($request->passnew)
            ]);
            return response()->json(["status" => 200, "success" => true, "message" => "Reset password success!", "data" => $request]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to reset password. Incorrect current password."]);
        }
    }
}
