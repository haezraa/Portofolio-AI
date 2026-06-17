<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ChatController;

Route::get('/', [PortfolioController::class, 'index']);
Route::post('/api/chat', [ChatController::class, 'sendMessage']);
