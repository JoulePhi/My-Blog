<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Post;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence;
        $content = $this->faker->paragraph;
        return [
            'user_id' => User::factory()->create()->id,
            'title' => $title,
            'content' => $content,
            'short_content' => Str::limit($content, 100),
            'meta_title' => $this->faker->sentence,
            'thumbnail' => $this->faker->imageUrl(),
            'slug' => Str::slug($title),
            'is_published' => $this->faker->boolean,
            'published_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            $tags = Tag::inRandomOrder()->take(rand(2, 6))->get();
            $categories = Category::inRandomOrder()->take(rand(2, 6))->get();

            $post->tags()->sync($tags->pluck('id'));
            $post->categories()->sync($categories->pluck('id'));
        });
    }
}
