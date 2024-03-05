<?php

namespace App\Services\CRUD;

use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostService
{
    /**
     * @throws Exception
     */
    public function create ($data, $thumbnail)
    {
        DB::beginTransaction();
        try {
            $slug = Str::slug($data['title']);
            $data['slug'] = $slug;
            $data['thumbnail'] = $thumbnail;
            $post = Post::create($data);
            $post->tags()->sync($data['tags']);
            $post->categories()->sync($data['categories']);
            DB::commit();
            return $post;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function update ($id, $data, $image)
    {
        DB::beginTransaction();
        try {
            $data['thumbnail'] = $image;
            $post =  Post::where('id', $id)->update($data);
            DB::commit();
            return  $post;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    public function delete ($id)
    {
        DB::beginTransaction();
        try {
            $post =  Post::where('id', $id)->delete();
            DB::commit();
            return  $post;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function get ($id)
    {
        return Post::where('id', $id)->first();
    }

    public function getSelectedTags($post,$tags)
    {
        $postTagIds = $post->tags->map(fn ($tag) => $tag->id)->toArray();

        $postTagIndexes = array_map(function ($tagId) use ($tags) {
            $index = array_search($tagId, array_column($tags->all(), 'value'));
            return $index !== false ? ['label' => $tags[$index]['label'], 'value' => $tagId] : null;
        }, $postTagIds);
        return array_filter($postTagIndexes, fn ($item) => !is_null($item));
    }

    public function getSelectedCategories($post, $categories)
    {
        $postCategoryIds = $post->categories->map(fn ($category) => $category->id)->toArray();

        $postCategoryIndexes = array_map(function ($categoryId) use ($categories) {
            $index = array_search($categoryId, array_column($categories->all(), 'value'));
            return $index !== false ? ['label' => $categories[$index]['label'], 'value' => $categoryId] : null;
        }, $postCategoryIds);
        return array_filter($postCategoryIndexes, fn ($item) => !is_null($item));
    }
}
