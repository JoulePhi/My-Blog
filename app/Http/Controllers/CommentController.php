<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublishCommentRequest;
use App\Services\CommentService;
use App\Models\Comment;
use Illuminate\Http\Request;
use Log;

class CommentController extends Controller
{

    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function publish(PublishCommentRequest $request)
    {
        try {
            $comment = $this->commentService->post($request);
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function get(Request $request)
    {
        $comments = Comment::with('comments')->where('post_id', $request->post_id)->where('parent_id', null)->get();
        return response()->json($comments, 200);
    }
}
