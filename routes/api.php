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
    Route::post('bindaccount', 'BindingController');
});

Route::resource('/invoice', 'InvoiceController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("/invhistory", "InvoiceController@showhistory");

Route::post('/ewallet', 'EwalletController@store');
Route::post('/virtual', 'VirtualController@store');
Route::post('/retail', 'RetailController@store');
Route::post('/qris', 'QrcodeController@store');

Route::patch('referral', 'ReferralController@update');
Route::post('referral', 'ReferralController@store');
Route::delete('referral', 'ReferralController@destroy');
Route::get('referral', 'ReferralController@index');
