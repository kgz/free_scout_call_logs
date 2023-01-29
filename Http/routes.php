<?php

Route::group( [ 'middleware' => 'web', 'prefix' => Helper::getSubdirectory(), 'namespace' => 'Modules\CallLogModule\Http\Controllers' ], function () {
// 	Route::get( '/calendar', [ 'uses' => 'LJPcCalendarModuleController@index' ] )->name( 'ljpccalendarmodule.index' );
// 	Route::get( '/calendar/ajax', [ 'uses' => 'LJPcCalendarModuleController@getItems' ] )->name( 'ljpccalendarmodule.ajax' );
// 	Route::post( '/calendar/ajax', [ 'uses' => 'LJPcCalendarModuleController@ajax' ] )->name( 'ljpccalendarmodule.ajax' );
// } );

// Route::group( [ 'prefix' => Helper::getSubdirectory(), 'namespace' => 'Modules\LJPcCalendarModule\Http\Controllers' ], function () {
// 	Route::get( '/calendar/{id}', [ 'uses' => 'LJPcCalendarModuleController@export' ] )->name( 'ljpccalendarmodule.external' );
	Route::post( '/calllog/addCall', [ 'uses' => 'CallLogModuleController@addCall' ] )->name( 'calllog.external' );
	Route::get( '/calllog/getCallByConvo', [ 'uses' => 'CallLogModuleController@getCallByConvo' ] )->name( 'calllog.external' );
} );
