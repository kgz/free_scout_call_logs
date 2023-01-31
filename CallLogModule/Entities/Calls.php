<?php
namespace Modules\CallLogModule\Entities;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use JsonSerializable;

class Calls extends Model implements JsonSerializable {
    public $timestamps = false;

	protected $table = 'call_logs';
	protected $fillable = [
		'call_id',
        'Conversation_id',
        'spoke_to',
        'call_reason',
        'call_type',
        'demeaner',
        'duration',
        'call_date',
        'call_notes',
        'user_id',
	];

	public function calls(): BelongsTo {
		return $this->belongsTo( Calls::class );
	}

}