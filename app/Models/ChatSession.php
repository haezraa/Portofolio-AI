<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    protected $fillable = [
        'session_token',
        'ip_address',
    ];

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }
}
