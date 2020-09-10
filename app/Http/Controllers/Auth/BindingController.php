<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BindingController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if (DB::connection('mysql2')->table('tbl_user')->where('email', $request->email)->first()) {
            // dd("sukses");
            User::where('email', $request->email)
                ->update(['is_binding' => $request->is_binding]);
            return response()->json(['status' => 200, 'message' => 'binding Updated Successfully']);
        }
        return response()->json(['status' => 'failed', 'message' => 'Email not found in gratismain DB']);
    }
}
