<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageHelper;
use Exception;
use Inertia\Inertia;
use App\Models\About;
use App\Services\CRUD\AboutService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAboutRequest;
use App\Http\Requests\Admin\UpdateAboutRequest;
use PHPUnit\TextUI\Help;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{


    protected AboutService $aboutService;


    public function __construct(AboutService $aboutService)
    {
        $this->aboutService = $aboutService;
    }


    public function index()
    {
        $about = About::first();
        return Inertia::render('Admin/About', ['about' => $about]);
    }

    public function update(UpdateAboutRequest $request, About $about)
    {
        try {
            $image = null;
            if ($request->hasFile('image')) {
                $image = ImageHelper::uploadImageContent($request);
            }
            $cv = null;
            if ($request->hasFile('cv')) {
                $filename = 'CV_DzulfikarSadid.pdf';
                $cv = $request->file('cv')->storeAs('cv', $filename, 'public');
            }
            $about = $this->aboutService->update($about->id, $request->validated(), $image, $cv);
            return response()->json(['message' => 'About updated successfully', 'about' => $about]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(StoreAboutRequest $request)
    {
        try {
            $image = ImageHelper::uploadImageContent($request);
            $cv = $request->file('cv')->storePublicly('cv', 'public');
            $about = $this->aboutService->create($request->validated(), $image, $cv);
            return response()->json(['message' => 'About created successfully', 'about' => $about]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
