<?php

namespace App\Services\CRUD;

use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectService
{
    public function create($data, $image)
    {
        DB::beginTransaction();
        try {
            $project = new Project();
            $project->name = $data['name'];
            $project->description = $data['description'];
            $project->thumbnail = $image;
            $project->repository_url = $data['repository_url'];
            $project->live_url = $data['live_url'];
            $project->save();
            $project->technologies()->sync($data['technologies']);
            DB::commit();
            return $project;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function update($id, $data, $image)
    {
        DB::beginTransaction();
        try {
            $project = Project::find($id);
            $project->name = $data['name'];
            $project->description = $data['description'];
            $project->thumbnail = $image;
            $project->repository_url = $data['repository_url'];
            $project->live_url = $data['live_url'];
            $project->save();
            $project->technologies()->sync($data['technologies']);
            DB::commit();
            return $project;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $project = Project::find($id);
            $project->delete();
            DB::commit();
            return $project;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getSelectedTech($project, $technology)
    {
        $projectTagIds = $project->technologies->map(fn ($technology) => $technology->id)->toArray();

        $projectTagIndexes = array_map(function ($tagId) use ($technology) {
            $index = array_search($tagId, array_column($technology->all(), 'value'));
            return $index !== false ? ['label' => $technology[$index]['label'], 'value' => $tagId] : null;
        }, $projectTagIds);
        return array_filter($projectTagIndexes, fn ($item) => !is_null($item));
    }
}
