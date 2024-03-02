<?php

namespace App\Services\CRUD;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostService
{
    public function create ($data)
    {
        DB::beginTransaction();
        try {
            $post = Post::create($data);
            DB::commit();
            return $post;
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }
    }

    public function update ($id, $data)
    {
        DB::beginTransaction();
        try {
            $post =  Post::where('id', $id)->update($data);
            DB::commit();
            return  $post;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete ($id)
    {
        DB::beginTransaction();
        try {
            $post =  Post::where('id', $id)->delete();
            DB::commit();
            return  $post;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function get ($id)
    {
        return Post::where('id', $id)->first();
    }
}
