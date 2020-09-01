<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'phone' => ['required', 'string', 'min:8', 'max:15', 'unique:users,phone'],
            'password'  => ['required', 'string', 'min:6']
        ]);

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
            'password' => bcrypt($request->password)
        ]);

        return response()->json(['message' => 'You\'re now registered!']);
    }
}
