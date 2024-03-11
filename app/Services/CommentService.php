<?php

namespace App\Services;

use App\Http\Requests\PublishCommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class CommentService
{

    public function post(PublishCommentRequest $request)
    {
        DB::beginTransaction();
        try {
            $comment = Comment::create($request->validated());
            DB::commit();
            return $comment;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
