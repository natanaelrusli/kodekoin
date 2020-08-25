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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("invhistory/{email}", "InvoiceController@showhistory");
Route::post('/ewalletcallback', 'InvoiceController@ewallet');
Route::post('/virtualcallback', 'InvoiceController@virtual');
Route::post('/retailcallback', 'InvoiceController@retail');
Route::post('/qriscallback', 'InvoiceController@qris');
