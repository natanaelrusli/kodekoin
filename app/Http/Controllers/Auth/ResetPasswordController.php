<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        if (bcrypt($request->passold) == $user->password) {
            $user->password = bcrypt($request->passnew);
            $user->save();
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Reset password success!", "data" => $request]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to reset password. Incorrect current password."]);
        }
    }
}
