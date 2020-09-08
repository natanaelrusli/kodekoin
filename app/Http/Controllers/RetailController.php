<?php

namespace App\Http\Controllers;

use App\Retail;
use Illuminate\Http\Request;

class RetailController extends Controller
{
    public function store(Request $request)
    {
        Retail::create([
            'is_single_use' => $request->is_single_use,
            'status' => $request->status,
            'owner_id' => $request->owner_id,
            'external_id' => $request->external_id,
            'retail_outlet_name' => $request->retail_outlet_name,
            'prefix' => $request->prefix,
            'name' => $request->name,
            'payment_code' => $request->payment_code,
            'type' => $request->type,
            'expected_amount' => $request->expected_amount,
            'expiration_date' => $request->expiration_date,
            'id_retail' => $request->id_retail
        ]);
        return response()->json('Retail Added Successfully');
    }

    public function update(Request $request)
    {
        $affected = Retail::where('id_retail', $request->id)
            ->update([
                'status' => $request->status,
            ]);
        if ($affected) {
            return response()->json(['status' => 200, 'message' => 'Retail Updated Successfully', 'data' => $affected]);
        } else {
            return response(null, 401);
        }
    }
}
