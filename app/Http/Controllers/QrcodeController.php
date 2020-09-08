<?php

namespace App\Http\Controllers;

use App\Qrcode;
use Illuminate\Http\Request;

class QrcodeController extends Controller
{
    public function store(Request $request)
    {
        Qrcode::create([
            'id_qr' => $request->id_qr,
            'external_id' => $request->external_id,
            'amount' => $request->amount,
            'qr_string' => $request->qr_string,
            'callback_url' => $request->callback_url,
            'type' => $request->type,
            'status' => $request->status
        ]);
        return response()->json('Qrcode Added Successfully');
    }

    public function update(Request $request)
    {
        $affected = Qrcode::where('id_qr', $request->id)
            ->update([
                'status' => $request->status,
            ]);
        if ($affected) {
            return response()->json(['status' => 200, 'message' => 'Qrcode Updated Successfully', 'data' => $affected]);
        } else {
            return response(null, 401);
        }
    }
}
