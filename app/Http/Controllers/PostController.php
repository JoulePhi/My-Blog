<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recentPosts = Post::with(['tags', 'categories'])->latest()->where('is_published', 1)->take(3)->get();
        $allPosts = Post::with(['tags', 'categories'])
            ->where('is_published', 1)
            ->get()
            ->groupBy(function ($post) {
                return $post->categories->first()->title;
            })
            ->map(function ($posts) {
                return $posts->take(4);
            });
        return Inertia::render('Home', [
            'recentPosts' => $recentPosts,
            'allPosts' => $allPosts
        ]);
    }

    public function tag($tag)
    {
        $posts = Post::with(['tags', 'categories'])
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('title', $tag);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
        return Inertia::render('FilteredPosts', ['title' => 'Tag / ' . $tag, 'posts' => $posts]);
    }

    public function category($category)
    {
        $posts = Post::with(['tags', 'categories'])
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('title', $category);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
        return Inertia::render('FilteredPosts', ['title' => 'Category / ' . $category, 'posts' => $posts]);
    }
}
