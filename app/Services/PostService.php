<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    public function index()
    {
       $post = Post::with(['tags','categories'])->where('is_published',1)->get();
    }
}
