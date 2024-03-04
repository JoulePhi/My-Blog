<?php
namespace Tests\Feature;

use App\Models\Tag;
use App\Services\CRUD\TagService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TagServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TagService $tagService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->tagService = new TagService();
    }

    public function testCreate()
    {
        $data = [
            'title' => 'Test Title',
            'meta_title' => 'Test Meta Title',
            'slug' => 'test-slug',
            'content' => 'Test Content',
        ];

        $tag = $this->tagService->create($data);

        $this->assertInstanceOf(Tag::class, $tag);
        $this->assertEquals($data['title'], $tag->title);
    }

    public function testUpdate()
    {
        $tag = Tag::factory()->create();

        $data = ['title' => 'Updated Title'];

        $updated = $this->tagService->update($tag->id, $data);

        $this->assertEquals(1, $updated);
        $this->assertEquals($data['title'], $tag->fresh()->title);
    }

    public function testDelete()
    {
        $tag = Tag::factory()->create();

        $deleted = $this->tagService->delete($tag->id);

        $this->assertEquals(1, $deleted);
        $this->assertNull(Tag::find($tag->id));
    }

    public function testGet()
    {
        $tag = Tag::factory()->create();

        $found = $this->tagService->get($tag->id);

        $this->assertInstanceOf(Tag::class, $found);
        $this->assertEquals($tag->id, $found->id);
    }
}

