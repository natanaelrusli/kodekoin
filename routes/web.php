<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

if (App::environment('production')) {
    URL::forceScheme('https');
}
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:api'])->group(function () {
    Route::view('/dashboard', 'dashboard');
});
Route::view('/', 'app');
Route::view('/login', 'login');
Route::view('/signup', 'signup');
// Route::get('{reactRoutes}', function () {
//     return view('app'); // your start view
// })->where('reactRoutes', '^((?!api).)*$'); // except 'api' word