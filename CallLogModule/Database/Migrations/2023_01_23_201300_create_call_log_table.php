<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCallLogTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::dropIfExists( 'call_logs' );

		Schema::create( 'call_logs', function ( Blueprint $table ) {
			$table->increments( 'id' );
			$table->integer( 'call_id' );
			$table->integer( 'Conversation_id' )->references('id')->on('conversations')->onDelete('cascade');
			$table->string( 'spoke_to' );
			$table->string( 'call_reason' );
			$table->string( 'call_type' );
			$table->string( 'demeaner' );
			$table->string( 'duration' );
			$table->dateTime( 'call_date' );
			$table->text( 'call_notes' );
			$table->integer( 'user_id' )->references('id')->on('users')->onDelete('cascade');
			$table->timestamp('timestamp')->useCurrent();
		});
		
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists( 'call_logs' );
	}
}
