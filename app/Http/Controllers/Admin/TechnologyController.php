<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTechnologyRequest;
use App\Http\Requests\Admin\UpdateTechnologyRequest;
use App\Models\Technology;
use App\Services\CRUD\TechnologyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{

    protected TechnologyService $technologyService;


    public function __construct(TechnologyService $technologyService)
    {
        $this->technologyService = $technologyService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $technologies = Technology::paginate(5)->onEachSide(2);

        return Inertia::render('Admin/Technologies', [
            'technologies' => $technologies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Form/Technologies');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnologyRequest $request)
    {
        try {
            $logo = ImageHelper::uploadImage($request);
            $data = $this->technologyService->create($request->validated(), $logo);
            return response()->json(['message' => 'Technology created successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Technology $technology)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technology $technology)
    {
        return Inertia::render('Admin/Form/Technologies', ['technology' => $technology]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnologyRequest $request, Technology $technology)
    {
        try {
            $image = ImageHelper::uploadImage($request);
            $data = $this->technologyService->update($technology->id, $request->validated(), $image);
            return response()->json(['message' => 'Technology updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        try {
            $data = $this->technologyService->delete($technology->id);
            return response()->json(['message' => 'Technology deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
