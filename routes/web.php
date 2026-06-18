<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SkillController;

Route::get('/', [PortfolioController::class, 'index']);
Route::post('/api/chat', [ChatController::class, 'sendMessage']);

Route::get('/admin/login', [LoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [LoginController::class, 'authenticate']);
Route::post('/admin/logout', [LoginController::class, 'logout'])->name('admin.logout');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('skills', SkillController::class);
    // CRUD routes will be added later
    // Route::resource('educations', EducationController::class);
    // Route::resource('experiences', ExperienceController::class);
    // Route::resource('projects', ProjectController::class);
    // Route::resource('settings', SettingController::class);
});
