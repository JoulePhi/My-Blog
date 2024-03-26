<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $projects = Project::with('technologies')->paginate(5);
        $about = About::first();
        return Inertia::render('About', [
            'projects' => $projects,
            'about' => $about
        ]);
    }

    public function downloadCv()
    {
        $about = About::first();
        return response()->download(storage_path("app/public/{$about->cv}"));
    }
}
