<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    // WAJIB ADA INI BIAR BISA DI-SAVE DARI CONTROLLER
    protected $fillable = ['key', 'value']; 
}