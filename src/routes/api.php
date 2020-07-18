<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('balances', 'Api\BalanceController')->except(['edit', 'create', 'show']);
Route::get('balance_sum', 'Api\BalanceSumController')->name('balance_sum');
