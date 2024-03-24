<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $projects = Project::with('technologies')->paginate(5);
        return Inertia::render('About', [
            'projects' => $projects
        ]);
    }
}
