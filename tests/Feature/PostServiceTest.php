<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Date;
use Tests\TestCase;
use App\Services\CRUD\PostService;
use App\Models\Post;


class PostServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PostService $postService;
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->postService = new PostService();
        $this->user = User::factory()->create();
    }

    public function testCreate()
    {

        $data = [
            'title' => 'Test Title',
            'content' => 'Test Content',
            'user_id' => $this->user->id,
            'meta_title' => 'Test Meta Title',
            'thumbnail' => 'Test Thumbnail',
            'slug' => 'test-slug',
            'is_published' => '1',
            'published_at' => Date::createFromTimeString('2021-01-01 00:00:00'),

        ];

        $post = $this->postService->create($data);
        $this->assertInstanceOf(Post::class, $post);
        $this->assertEquals($data['title'], $post->title);
        $this->assertEquals($data['content'], $post->content);
    }

    public function testUpdate()
    {
        $post = Post::factory()->create();

        $data = [
            'title' => 'Updated Title',
            'content' => 'Updated Content',
        ];

        $updated = $this->postService->update($post->id, $data);

        $this->assertEquals(1, $updated);
        $this->assertEquals($data['title'], $post->fresh()->title);
        $this->assertEquals($data['content'], $post->fresh()->content);
    }

    public function testDelete()
    {
        $post = Post::factory()->create();

        $deleted = $this->postService->delete($post->id);

        $this->assertEquals(1, $deleted);
        $this->assertNull(Post::find($post->id));
    }

    public function testGet()
    {
        $post = Post::factory()->create();

        $found = $this->postService->get($post->id);

        $this->assertInstanceOf(Post::class, $found);
        $this->assertEquals($post->id, $found->id);
    }
}
