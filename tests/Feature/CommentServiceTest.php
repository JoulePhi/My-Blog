<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Services\CRUD\CommentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentServiceTest extends TestCase
{
    use RefreshDatabase;

    protected CommentService $commentService;
    protected  Post $post;

    public function setUp(): void
    {
        parent::setUp();
        $this->commentService = new CommentService();
        $this->post = Post::factory()->create();
    }

    public function testCreate()
    {
        $data = [
            'title' => 'Test Title',
            'post_id' => $this->post->id,
            'email' => 'test@mail.com',
            'content' => 'Test Content',
        ];

        $post = $this->commentService->create($data);
        $this->assertInstanceOf(Comment::class, $post);
        $this->assertEquals($data['title'], $post->title);
        $this->assertEquals($data['content'], $post->content);
    }

    public function testUpdate()
    {

        $comment = Comment::factory()->create();

        $data = [
            'content' => 'Updated Comment',
        ];

        $updated = $this->commentService->update($comment->id, $data);

        $this->assertEquals(1, $updated);
        $this->assertEquals($data['content'], $comment->fresh()->content);
    }

    public function testDelete()
    {
        $comment = Comment::factory()->create();

        $deleted = $this->commentService->delete($comment->id);

        $this->assertEquals(1, $deleted);
        $this->assertNull(Comment::find($comment->id));
    }

    public function testGet()
    {
        $comment = Comment::factory()->create();

        $found = $this->commentService->get($comment->id);

        $this->assertInstanceOf(Comment::class, $found);
        $this->assertEquals($comment->id, $found->id);
    }
}
