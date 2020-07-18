<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Balance;
use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$labels = [
    'Car Insurance',
    'Groceries',
    'Rent',
    'Lottery',
    'Utility Bill',
    'Rent',
    'Refund'
];

$factory->define(Balance::class, function (Faker $faker) use ($labels) {

    return [
        'label' => $faker->randomElement($labels),
        'date' => $faker->dateTimeBetween('-7 months', 'now'),
        'amount' => $faker->randomFloat(2, -1000, 3000)
    ];
});
