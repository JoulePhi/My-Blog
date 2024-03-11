<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\PostService;
use Request;

class PostController extends Controller
{

    protected PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }


    public function index()
    {
        $data = $this->postService->index();
        return Inertia::render('Home', $data);
    }

    public function tag($tag)
    {
        $posts = $this->postService->getPostsTag($tag);
        return Inertia::render('FilteredPosts', ['title' => 'Tag / ' . $tag, 'posts' => $posts]);
    }

    public function category($category)
    {
        $posts = $this->postService->getPostsCategory($category);
        return Inertia::render('FilteredPosts', ['title' => 'Category / ' . $category, 'posts' => $posts]);
    }

    public function detail($slug)
    {
        $data = $this->postService->getDetailPost($slug);
        return Inertia::render('DetailPost', $data);
    }

    public function search($query)
    {
        $posts = $this->postService->search($query);
        return response()->json($posts);
    }
}
