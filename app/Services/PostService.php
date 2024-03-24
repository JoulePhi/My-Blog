<?php

namespace App\Services;

use App\Models\Post;

class PostService
{
    public function index()
    {
        $recentPosts = Post::with(['tags', 'categories'])->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'short_content', 'published_at')->orderBy('published_at', 'desc')->where('is_published', 1)->take(3)->get();
        $allPosts = Post::with(['tags', 'categories'])
            ->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'short_content', 'published_at')
            ->where('is_published', 1)
            ->get()
            ->groupBy(function ($post) {
                return $post->categories->first()->title;
            })
            ->map(function ($posts) {
                return $posts->take(4);
            })
            ->sortByDesc(function ($posts) {
                return $posts->count();
            });

        return ['recentPosts' => $recentPosts, 'allPosts' => $allPosts];
    }


    public function getPostsTag($tag)
    {
        return Post::with(['tags', 'categories'])
            ->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'short_content', 'published_at')
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('title', $tag);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
    }

    public function getPostsCategory($category)
    {
        return Post::with(['tags', 'categories'])
            ->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'short_content', 'published_at')
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('title', $category);
            })
            ->where('is_published', 1)
            ->paginate(8)->onEachSide(3);
    }

    public function getDetailPost($slug)
    {
        $post =  Post::with(['tags', 'categories'])->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'content', 'short_content', 'published_at')->where('slug', $slug)->firstOrFail();
        $relatedPosts = Post::with(['tags', 'categories'])
            ->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'short_content', 'published_at')
            ->where('is_published', 1)
            ->whereHas('tags', function ($query) use ($post) {
                $query->whereIn('title', $post->tags->pluck('title'));
            })
            ->where('id', '!=', $post->id)
            ->take(4)
            ->get();
        return ['post' => $post, 'relatedPosts' => $relatedPosts];
    }

    public function search($query)
    {
        return Post::with(['tags', 'categories'])
            ->select('id', 'title', 'slug', 'is_published', 'thumbnail', 'published_at')
            ->where('title', 'like', '%' . $query . '%')
            ->orWhere('content', 'like', '%' . $query . '%')
            ->where('is_published', 1)
            ->take(4)
            ->get();
    }
}
