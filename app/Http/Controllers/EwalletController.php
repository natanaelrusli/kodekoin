<?php

namespace App\Http\Controllers;

use App\Ewallet;
use Illuminate\Http\Request;

class EwalletController extends Controller
{
    public function store(Request $request)
    {
        Ewallet::create([
            'external_id' => $request->external_id,
            'amount' => $request->amount,
            'checkout_url' => $request->checkout_url,
            'ewallet_type' => $request->ewallet_type,
            'business_id' => $request->business_id,
            'status' => $request->status,
            'phone' => $request->phone,
        ]);
        return response()->json('Ewallet Added Successfully', $request);
    }

    public function update(Request $request)
    {
        $ewallet = Ewallet::where('external_id', $request->external_id)->firstOrFail();
        $ewallet->status = $request->status;
        $ewallet->save();
        return response()->json('Ewallet Updated Successfully', $ewallet);
    }
}
