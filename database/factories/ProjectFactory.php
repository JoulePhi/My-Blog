<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Technology>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'thumbnail' => $this->faker->imageUrl(),
            'repository_url' => $this->faker->url,
            'live_url' => $this->faker->url,
            'thumbnail' => $this->faker->imageUrl(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Project $post) {
            $technologies = Technology::inRandomOrder()->take(3)->get();
            $post->technologies()->sync($technologies->pluck('id'));
        });
    }
}
