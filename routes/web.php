<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\PostController as PC;
use App\Http\Controllers\CommentController as CC;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\TechnologyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/home', [PC::class, 'index'])->name('home');
Route::get('/tag/{tag}', [PC::class, 'tag'])->name('tag');
Route::get('/category/{category}', [PC::class, 'category'])->name('category');
Route::get('/post/{slug}', [PC::class, 'detail'])->name('detail');
Route::post('/comment', [CC::class, 'publish'])->name('comment');
Route::get('/comment', [CC::class, 'get'])->name('comment.get');
Route::get('/search/{query}', [PC::class, 'search'])->name('search');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/cv/download', [AboutController::class, 'downloadCv'])->name('cv');

Route::middleware(['auth'])->group(function () {

    Route::post('/upload/content', [PostController::class, 'uploadContentImage'])->name('upload.content');

    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');

        Route::resource('posts', PostController::class)->names([
            'index' => 'admin.posts.index',
            'create' => 'admin.posts.create',
            'store' => 'admin.posts.store',
            'show' => 'admin.posts.show',
            'edit' => 'admin.posts.edit',
            'update' => 'admin.posts.update',
            'destroy' => 'admin.posts.destroy',
        ]);
        Route::resource('tags', TagController::class)->names([
            'index' => 'admin.tags.index',
            'create' => 'admin.tags.create',
            'store' => 'admin.tags.store',
            'show' => 'admin.tags.show',
            'edit' => 'admin.tags.edit',
            'update' => 'admin.tags.update',
            'destroy' => 'admin.tags.destroy',
        ]);
        Route::resource('categories', CategoryController::class)->names([
            'index' => 'admin.categories.index',
            'create' => 'admin.categories.create',
            'store' => 'admin.categories.store',
            'show' => 'admin.categories.show',
            'edit' => 'admin.categories.edit',
            'update' => 'admin.categories.update',
            'destroy' => 'admin.categories.destroy',
        ]);

        Route::resource('technologies', TechnologyController::class)->names([
            'index' => 'admin.technologies.index',
            'create' => 'admin.technologies.create',
            'store' => 'admin.technologies.store',
            'show' => 'admin.technologies.show',
            'edit' => 'admin.technologies.edit',
            'update' => 'admin.technologies.update',
            'destroy' => 'admin.technologies.destroy',
        ]);

        Route::resource('projects', ProjectController::class)->names([
            'index' => 'admin.projects.index',
            'create' => 'admin.projects.create',
            'store' => 'admin.projects.store',
            'show' => 'admin.projects.show',
            'edit' => 'admin.projects.edit',
            'update' => 'admin.projects.update',
            'destroy' => 'admin.projects.destroy',
        ]);


        Route::resource('about', AdminAboutController::class)->names([
            'index' => 'admin.about.index',
            'create' => 'admin.about.create',
            'store' => 'admin.about.store',
            'show' => 'admin.about.show',
            'edit' => 'admin.about.edit',
            'update' => 'admin.about.update',
            'destroy' => 'admin.about.destroy',
        ]);

        Route::put('admin/posts/{id}/publish', [PostController::class, 'publish'])->name('admin.post.publish');
    });
});

require __DIR__ . '/auth.php';
