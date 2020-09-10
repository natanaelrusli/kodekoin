<?php

namespace App\Http\Controllers;

use App\Referral;
use Illuminate\Http\Request;

class ReferralController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Referral::all());
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
        $referral = Referral::where('email', $request->email)->first();
        if ($referral) {
            return response()->json(['status' => 'failed', 'message' => 'Email already request the referral code']);
        } else {
            $data = Referral::create([
                'email' => $request->email,
                'referral_code' => $request->referral_code
            ]);
            return response()->json(['status' => 200, 'message' => 'Success requesting referral code!', 'data' => $data]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Referral  $referral
     * @return \Illuminate\Http\Response
     */
    public function show($email)
    {
        $data = Referral::where('email', $email)->first();
        if ($data) {
            return response()->json(['status' => 200, 'data' => $data]);
        }
        return response()->json(['status' => "failed", 'message' => 'Email not found']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Referral  $referral
     * @return \Illuminate\Http\Response
     */
    public function edit(Referral $referral)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Referral  $referral
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = Referral::where('email', $request->email)->first();
        if ($data) {
            Referral::where('email', $request->email)->Update(['referral_code' => $request->referral_code]);
            return response()->json(['status' => 200, 'message' => 'Update Success']);
        }
        return response()->json(['status' => "failed", 'message' => 'Update Failed! Email never request yet']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Referral  $referral
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = Referral::where('email', $request->email)->first();
        if ($data) {
            Referral::where('email', $request->email)->delete();
            return response()->json(['status' => 200, 'message' => 'Delete Success']);
        }
        return response()->json(['status' => "failed", 'message' => 'Delete Failed! Email not found']);
    }
}
