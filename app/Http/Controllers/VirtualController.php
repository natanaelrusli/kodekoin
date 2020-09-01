<?php

namespace App\Http\Controllers;

use App\Virtual;
use Illuminate\Http\Request;

class VirtualController extends Controller
{
    public function store(Request $request)
    {
        Virtual::create([
            'is_closed' => $request->is_closed,
            'status' => $request->status,
            'currency' => $request->currency,
            'owner_id' => $request->owner_id,
            'external_id' => $request->external_id,
            'bank_code' => $request->bank_code,
            'merchant_code' => $request->merchant_code,
            'name' => $request->name,
            'account_number' => $request->account_number,
            'is_single_use' => $request->is_single_use,
            'id_va' => $request->id_va
        ]);
        return response()->json('Virtual Added Successfully');
    }

    public function update(Request $request)
    {
        $virtual = Virtual::where('id_va', $request->id)->firstOrFail();
        $virtual->status = $request->status;
        $virtual->save();
        return response()->json('Virtual Updated Successfully');
    }
}
