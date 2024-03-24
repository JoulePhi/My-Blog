<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Technology;
use App\Services\CRUD\ProjectService;
use Inertia\Inertia;
use Log;

class ProjectController extends Controller
{


    protected ProjectService $projectService;


    public function __construct(ProjectService $projectService)
    {

        $this->projectService = $projectService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('technologies')->paginate(5)->onEachSide(3);
        return Inertia::render('Admin/Projects', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $technologies = Technology::all()->map(function ($technology) {
            return ['value' => $technology->id, 'label' => $technology->name];
        });

        return Inertia::render('Admin/Form/Projects', [
            'technologies' => $technologies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            $image = ImageHelper::uploadImage($request);
            $project = $this->projectService->create($request->validated(), $image);
            return response()->json(['message' => 'Project created successfully']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->load('technologies');
        $technologies = Technology::all()->map(function ($technology) {
            return ['value' => $technology->id, 'label' => $technology->name];
        });
        $technologiesTech = $this->projectService->getSelectedTech($project, $technologies);
        return Inertia::render('Admin/Form/Projects', [
            'project' => $project,
            'technologies' => $technologies,
            'technologiesTech' => $technologiesTech
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        try {
            $image = ImageHelper::uploadImage($request);
            $project = $this->projectService->update($project->id, $request->validated(), $image);
            return response()->json(['message' => 'Project updated successfully']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        try {
            $project = $this->projectService->delete($project->id);
            return response()->json(['message' => 'Project deleted successfully']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
