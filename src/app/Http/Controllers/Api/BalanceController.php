<?php

namespace App\Http\Controllers\Api;

use App\Balance;
use App\Http\Controllers\Controller;
use App\Http\Resources\BalanceResource;
use Illuminate\Http\Request;
use stdClass;

class BalanceController extends Controller
{
    public function index(Request $request)
    {
        return BalanceResource::collection(Balance::all());
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'label' => 'required|min:2',
            'date' => 'required|date_format:Y-m-d H:i:s',
            'amount' => 'required|numeric'
        ]);
        $balance =  Balance::create($data);

        return new BalanceResource($balance);
    }

    public function update($id, Request $request)
    {
        $balance = Balance::findOrFail($id);

        $data = $request->validate([
            'label' => 'min:2',
            'date' => 'date_format:Y-m-d H:i:s',
            'amount' => 'numeric'
        ]);

        foreach ($data as $k => $v) {
            $balance->{$k} = $v;
        }

        $balance->save();

        return new BalanceResource($balance);
    }

    public function destroy($id)
    {
        $balance = Balance::findOrFail($id);
        $balance->delete();

        return response()->json([]);
    }
}
