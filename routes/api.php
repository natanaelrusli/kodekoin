<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("signup", "UserController@userSignUp");
Route::post("resetpass", "UserController@resetPassword");
Route::post("login", "UserController@userLogin");
Route::get("user/{email}", "UserController@userDetail");
Route::get("pass/{email}", "UserController@userPass");

Route::resource('/invoice', 'InvoiceController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/invhistory/{email}", "InvoiceController@showhistory");

// Route::post('/invoicecallback', 'InvoiceController@update');
Route::post('/ewalletcallback', 'EwalletController@update');
Route::post('/virtualcallback', 'VirtualController@update');
Route::post('/retailcallback', 'RetailController@update');
Route::post('/qriscallback', 'QrcodeController@update');

Route::post('/ewallet', 'EwalletController@store');
Route::post('/virtual', 'VirtualController@store');
Route::post('/retail', 'RetailController@store');
Route::post('/qris', 'QrcodeController@store');
