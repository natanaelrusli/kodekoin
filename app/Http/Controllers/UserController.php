<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    private $status_code    =        200;

    public function userSignUp(Request $request)
    {
        $validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            "email"             =>          "required|email",
            "password"          =>          "required|min:8",
            "phone"             =>          "required|unique:users,phone|regex:/^([0-9\s\-\+\(\)]*)$/|min:10"
        ]);

        $errors = $validator->errors();
        if ($errors->get('email')) {
            return response()->json(["status" => "failed", "message" => "Email error", "errors" => $validator->errors()]);
        }
        if ($errors->get('password')) {
            return response()->json(["status" => "failed", "message" => "Password error", "errors" => $validator->errors()]);
        }
        if ($errors->get('phone')) {
            return response()->json(["status" => "failed", "message" => "Phone duplicate", "errors" => $validator->errors()]);
        }
        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation Error", "errors" => $validator->errors()]);
        }

        $name                   =       $request->name;
        $name                   =       explode(" ", $name);
        $first_name             =       $name[0];
        $last_name              =       "";

        if (isset($name[1])) {
            $last_name          =       $name[1];
        }

        $userDataArray          =       array(
            "first_name"         =>          $first_name,
            "last_name"          =>          $last_name,
            "full_name"          =>          $request->name,
            "email"              =>          $request->email,
            "password"           =>          md5($request->password),
            "phone"              =>          $request->phone
        );

        $user_status            =           User::where("email", $request->email)->first();

        if (!is_null($user_status)) {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! email already registered"]);
        }

        $user                   =           User::create($userDataArray);

        if (!is_null($user)) {
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
        }
    }


    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request)
    {

        $validator          =       Validator::make(
            $request->all(),
            [
                "email"             =>          "required|email",
                "password"          =>          "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }


        // check if entered email exists in db
        $email_status       =       User::where("email", $request->email)->first();


        // if email exists then we will check password for the same email

        if (!is_null($email_status)) {
            $password_status    =   User::where("email", $request->email)->where("password", md5($request->password))->first();

            // if password is correct
            if (!is_null($password_status)) {
                $user           =       $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user               =       array();
        if ($email != "") {
            $user           =       User::where("email", $email)->first();
            return $user;
        }
    }

    public function userPass($email)
    {
        $user = User::where("email", $email)->first();
        return response()->json($user->password);
    }

    public function resetPassword(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if (md5($request->passold) == $user->password) {
            $user->password = md5($request->passnew);
            $user->save();
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Reset password success!", "data" => $request]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to reset password. Incorrect current password."]);
        }
    }

    // public function isAuth($request, Closure $next)
    // {
    //     if (!$this->auth->user()) {
    //         return view('login');
    //     }
    //     return $next($request);
    // }
}
