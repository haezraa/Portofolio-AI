<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $skills = Skill::all();
        $educations = Education::orderBy('start_year', 'desc')->get();
        $experiences = Experience::orderBy('start_date', 'desc')->get();
        $projects = Project::orderBy('created_at', 'desc')->get();
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Public/Home', [
            'skills' => $skills,
            'educations' => $educations,
            'experiences' => $experiences,
            'projects' => $projects,
            'settings' => $settings,
        ]);
    }
}