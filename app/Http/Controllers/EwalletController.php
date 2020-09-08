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
        return response()->json('Ewallet Added Successfully');
    }

    public function update(Request $request)
    {
        $affected = Ewallet::where('external_id', $request->external_id)
            ->update([
                'status' => $request->status,
            ]);
        if ($affected) {
            return response()->json(['status' => 200, 'message' => 'Ewallet Updated Successfully', 'data' => $affected]);
        } else {
            return response(null, 401);
        }
    }
}
