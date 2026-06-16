<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company_or_organization',
        'position',
        'start_date',
        'end_date',
        'description_id',
        'description_en',
    ];
}
