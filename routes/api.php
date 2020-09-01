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

Route::namespace('Auth')->group(function () {
    Route::post('register', 'RegisterController');
    Route::post('login', 'LoginController');
    Route::post('logout', 'LogoutController');
    Route::post('resetpass', 'ResetPasswordController');
});

Route::resource('/invoice', 'InvoiceController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/invhistory/{email}", "InvoiceController@showhistory");

Route::post('/ewallet', 'EwalletController@store');
Route::post('/virtual', 'VirtualController@store');
Route::post('/retail', 'RetailController@store');
Route::post('/qris', 'QrcodeController@store');
