<?php

namespace App\Http\Controllers\Api;

use App\Balance;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BalanceSumController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        dd(collect(Balance::all())->sum('amount'));
    }
}
