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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::middleware(['cors'])->group(function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login')->name('login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');

    Route::post('/storeUser', 'App\Http\Controllers\UserController@storeUser');
    Route::get('/retrieveSpecificUser/{id}', 'App\Http\Controllers\UserController@retrieveSpecificUser');

    Route::post('/storeCategory', 'App\Http\Controllers\CategoryController@storeCategory');
    Route::get('/showAllCategories', 'App\Http\Controllers\CategoryController@showAllCategories');

    Route::post('/storeProduct', 'App\Http\Controllers\ProductController@storeProduct');
    Route::post('/buyProduct', 'App\Http\Controllers\ProductController@buyProduct');
    Route::post('/listProduct', 'App\Http\Controllers\ProductController@listProduct');
    Route::get('/showAllProducts', 'App\Http\Controllers\ProductController@showAllProducts');
    Route::get('/showProductsByCategory/{category_id}', 'App\Http\Controllers\ProductController@showProductsByCategory');
    Route::get('/showSpecificProduct/{product_id}', 'App\Http\Controllers\ProductController@showSpecificProduct');
    Route::get('/showSoldProductsHistory/{seller_id}', 'App\Http\Controllers\ProductController@showSoldProductsHistory');
});

Route::get('/ ', function () {
    return response()->json(['message' => 'Hello World!'], 200);
});

//Route::apiResource('products', Product::class);


