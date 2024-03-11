<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
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
        return ['recentPosts' => $recentPosts, 'allPosts' => $allPosts];
    }


    public function getPostsTag($tag)
    {
        return Post::with(['tags', 'categories'])
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('title', $tag);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
    }

    public function getPostsCategory($category)
    {
        return Post::with(['tags', 'categories'])
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('title', $category);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
    }

    public function getDetailPost($slug)
    {
        $post =  Post::with(['tags', 'categories'])->where('slug', $slug)->firstOrFail();
        $relatedPosts = Post::with(['tags', 'categories'])
            ->where('is_published', 1)
            ->whereHas('tags', function ($query) use ($post) {
                $query->whereIn('title', $post->tags->pluck('title'));
            })
            ->where('id', '!=', $post->id)
            ->take(4)
            ->get();
        return ['post' => $post, 'relatedPosts' => $relatedPosts];
    }
}
