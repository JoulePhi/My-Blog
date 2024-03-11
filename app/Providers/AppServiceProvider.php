<?php

namespace App\Providers;

use App\Services\CRUD\PostService;
use App\Services\PostService as PS;
use App\Services\CRUD\CategoryService;
use App\Services\CRUD\TagService;
use App\Services\CRUD\CommentService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(PostService::class, function ($app) {
            return new PostService();
        });
        $this->app->singleton(CategoryService::class, function ($app) {
            return new CategoryService();
        });
        $this->app->singleton(TagService::class, function ($app) {
            return new TagService();
        });
        $this->app->singleton(CommentService::class, function ($app) {
            return new CommentService();
        });
        $this->app->singleton(PS::class, function ($app) {
            return new PS();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
