<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'institution',
        'degree',
        'start_year',
        'end_year',
        'description_id',
        'description_en',
    ];
}
