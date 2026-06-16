<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'thumbnail',
        'description_id',
        'description_en',
        'technologies',
        'project_url',
        'github_url',
    ];

    protected $casts = [
        'technologies' => 'array',
    ];
}
