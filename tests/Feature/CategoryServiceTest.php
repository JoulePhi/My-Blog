<?php
namespace Tests\Feature;

use App\Models\Category;
use App\Services\CRUD\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected CategoryService $tagService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->tagService = new CategoryService();
    }

    public function testCreate()
    {
        $data = [
            'title' => 'Test Title',
            'meta_title' => 'Test Meta Title',
            'slug' => 'test-slug',
        ];

        $tag = $this->tagService->create($data);

        $this->assertInstanceOf(Category::class, $tag);
        $this->assertEquals($data['title'], $tag->title);
    }

    public function testUpdate()
    {
        $tag = Category::factory()->create();

        $data = ['title' => 'Updated Title'];

        $updated = $this->tagService->update($tag->id, $data);

        $this->assertEquals(1, $updated);
        $this->assertEquals($data['title'], $tag->fresh()->title);
    }

    public function testDelete()
    {
        $tag = Category::factory()->create();

        $deleted = $this->tagService->delete($tag->id);

        $this->assertEquals(1, $deleted);
        $this->assertNull(Category::find($tag->id));
    }

    public function testGet()
    {
        $tag = Category::factory()->create();

        $found = $this->tagService->get($tag->id);

        $this->assertInstanceOf(Category::class, $found);
        $this->assertEquals($tag->id, $found->id);
    }
}

