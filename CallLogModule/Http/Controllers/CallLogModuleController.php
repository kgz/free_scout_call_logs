<?php

namespace Modules\CallLogModule\Http\Controllers;

use App\Conversation;
use App\Thread;
use App\User;
use DateTime;
use DateTimeZone;
use Illuminate\Contracts\View\Factory;
use Illuminate\Foundation\Application;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\View\View;
use Modules\CallLogModule\Entities\Calls;

class CallLogModuleController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Factory|Application|View
	 */

	 public function index() {
		$allCalendars = [];


		return view( 'CallLogModule::index', [
			'calendars' => json_encode( $allCalendars ),
		] );

	}

	public function addCall(){

		if(!Auth::check()){
			return Response::json( [ 'status' => 'error', 'message' => 'Not logged in' ], 401 );
		}

		$data = request()->post();
		// $all = Calls::all();

		$call  = Calls::create([
			'call_id' => 1,
			'Conversation_id' => $data['c_id'] ?? '',
			'spoke_to' => $data['spokento'] ?? '',
			'call_reason' => $data['c_reason']?? '',
			'call_type' => $data['ct']?? '',
			'demeaner' => $data['dem']?? '',
			'duration' => $data['duration_mins']?? '',
			'call_date' => $data['dt']?? '',
			'call_notes' => $data['notes']?? '',
			'user_id' => Auth::id()
		]);
		return response()->json($call);
		// return Response::json( [ 'status' => 'success', 'call'=>$call ], 200 );

	}

	public function getCallByConvo(){
		if(!Auth::check()){
			return Response::json( [ 'status' => 'error', 'message' => 'Not logged in' ], 401 );
		}

		$id = request()->get('id');
		if(!$id){
			return Response::json( [ 'status' => 'error', 'message' => 'No ID' ], 400 );
		}
		$calls = Calls::where('Conversation_id', $id)->orderby('call_date', 'desc')->get();

		//attacher username/icon to each call
		foreach($calls as $call){
			$user = User::find($call->user_id);
			$call->user_name = $user->first_name . ' ' . $user->last_name;
			$call->user_icon = $user->photo_url;
		}
		return Response::json( [ 'status' => 'success', 'calls' => $calls], 200 );
	}
}
