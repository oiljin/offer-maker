<?php
/**
 * Created by PhpStorm.
 * User: oleg
 * Date: 24.11.2015
 * Time: 15:32
 */

Route::get('/offert-maker', function () {

    //echo config('offermaker.salary');
    //return ['id' => 1, 'name' => 'offer'];

    return view('offermaker::layouts.share');
});