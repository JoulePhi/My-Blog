<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

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
        return [
            'user_id' => User::factory()->create()->id,
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'meta_title' => $this->faker->sentence,
            'thumbnail' => $this->faker->imageUrl(),
            'slug' => $this->faker->slug,
            'is_published' => $this->faker->boolean,
            'published_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
