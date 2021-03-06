<?php

namespace App\Http\Controllers;

use App\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Invoice::all());
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
        Invoice::create([
            'id_invoice' => $request->id_invoice,
            'id_user' => $request->id_user,
            'id_external' => $request->external_id,
            'email' => $request->email,
            'amount' => $request->amount,
            'method' => $request->method,
            'status' => $request->status,
            'description' => $request->description,
            'invoice_url' => $request->invoice_url,
            'expiry_date' => $request->expiry_date
        ]);
        return response()->json('Invoice Added Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $url = Invoice::findOrFail($id);
        return response()->json($url);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        return response()->json($invoice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Invoice::where('id', $id)
        //     ->update($request->all());
        $model = Invoice::find($id);
        $model->status = $request->status;
        $model->save();
        return response()->json($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return response()->json('Invoice Deleted Successfully');
    }

    public function showhistory(Request $request)
    {
        $invoices = Invoice::where('email', $request->email)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        return response()->json($invoices);
    }

    public function ewallet(Request $request)
    {
        $invoices = Invoice::where("id_invoice", $request->id)->firstOrFail();
        $invoices->status = $request->status;
        $invoices->save();
        return response()->json($invoices);
    }
    public function retail(Request $request)
    {
        $invoices = Invoice::where("id_invoice", $request->id)->firstOrFail();
        $invoices->status = $request->status;
        $invoices->save();
        return response()->json($invoices);
    }
    public function virtual(Request $request)
    {
        $invoices = Invoice::where("id_invoice", $request->id)->firstOrFail();
        $invoices->status = $request->status;
        $invoices->save();
        return response()->json($invoices);
    }
    public function qris(Request $request)
    {
        $invoices = Invoice::where("id_invoice", $request->id)->firstOrFail();
        $invoices->status = $request->status;
        $invoices->save();
        return response()->json($invoices);
    }
}
