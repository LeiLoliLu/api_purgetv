<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurgeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(\App\Http\Controllers\PagesController::class)->group(function () {
    Route::get('/', [\App\Http\Controllers\PagesController::class, 'home'])->name('home');
    Route::post('/', [\App\Http\Controllers\PagesController::class, 'store'])->name('home.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(\App\Http\Controllers\PostController::class)->group(function () {
    Route::get('/profile', 'listMineProf')->name('profile.index');
    Route::get('postsLiked', 'postsLiked')->name('posts.postsLiked');
    Route::get('posts/{id}', 'show')->name('posts.show');
    Route::post('posts/like/{id}', 'like')->name('posts.like');
});

Route::controller(\App\Http\Controllers\PurgeController::class)->group(function () {
    Route::get('/purges', [PurgeController::class, 'index'])->name('purges.index');
    Route::get('/purges/{id}', 'show')->name('purges.show');
    Route::post('/purges/', 'store')->name('purges.store');

});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});


