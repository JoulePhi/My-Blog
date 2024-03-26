<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $projects = Project::with('technologies')->paginate(5);
        $about = About::first();
        $techs = Technology::all();
        return Inertia::render('About', [
            'projects' => $projects,
            'about' => $about,
            'techs' => $techs
        ]);
    }

    public function downloadCv()
    {
        $about = About::first();
        return response()->download(storage_path("app/public/{$about->cv}"));
    }
}
