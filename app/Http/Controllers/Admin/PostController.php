<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublishPostRequest;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Services\CRUD\PostService;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PostController extends Controller
{

    protected PostService $postService;

    public function __construct(PostService $postService)
    {

        $this->postService = $postService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Post::with(['tags', 'categories'])->paginate(5)->onEachSide(3);

        return Inertia::render('Admin/Blogs', ['blogs' => $blogs]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::all()->map(function ($tag) {
            return ['value' => $tag->id, 'label' => $tag->title];
        });
        $categories = Category::all()->map(function ($category) {
            return ['value' => $category->id, 'label' => $category->title];
        });
        return Inertia::render('Admin/Form/Blogs', ['tags' => $tags, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        try {
            $image = ImageHelper::uploadImage($request);
            $this->postService->create($request->validated(), $image);
            return response()->json(['message' => 'Blog created successfully']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post->load('tags', 'categories');
        $tags = Tag::all()->map(function ($tag) {
            return ['value' => $tag->id, 'label' => $tag->title];
        });
        $categories = Category::all()->map(function ($category) {
            return ['value' => $category->id, 'label' => $category->title];
        });
        $postTagIndexes = $this->postService->getSelectedTags($post, $tags);
        $postCategoryIndexes = $this->postService->getSelectedCategories($post, $categories);
        return Inertia::render('Admin/Form/Blogs', ['blog' => $post, 'tags' => $tags, 'categories' => $categories, 'postTagIndexes' => $postTagIndexes, 'postCategoryIndexes' => $postCategoryIndexes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {

        try {
            $image = ImageHelper::uploadImage($request);
            $this->postService->update($post->id, $request->validated(), $image);
            return response()->json(['message' => 'Blog updated successfully']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            $this->postService->delete($post->id);
            return response()->json(['message' => 'Post deleted successfully']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function publish(PublishPostRequest $request, $id)
    {
        try {
            $post = $this->postService->publishPost($id);
            return response()->json(['message' => 'Post state changed', 'post' => $post]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function uploadContentImage(Request $request)
    {
        $image = ImageHelper::uploadImageContent($request);
        return response()->json(['location' => $image]);
    }
}
