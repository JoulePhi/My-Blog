<?php

namespace App\Services\CRUD;

use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class CommentService
{
    public function create ($data)
    {
        DB::beginTransaction();
        try {
            $comment = Comment::create($data);
            DB::commit();
            return $comment;
        } catch (\Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }

    }

    public function update ($id, $data)
    {
        DB::beginTransaction();
        try {
            $comment =  Comment::where('id', $id)->update($data);
            DB::commit();
            return  $comment;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete ($id)
    {
        DB::beginTransaction();
        try {
            $comment =  Comment::where('id', $id)->delete();
            DB::commit();
            return  $comment;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function get ($id)
    {
        return Comment::where('id', $id)->first();
    }
}
