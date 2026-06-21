<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
            'technologies' => 'required|array',
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        if (!isset($validated['technologies'])) {
            $validated['technologies'] = [];
        }

        Project::create($validated);

        return redirect('/admin/projects')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
            'technologies' => 'required|array',
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        if (!isset($validated['technologies'])) {
            $validated['technologies'] = [];
        }

        $project->update($validated);

        return redirect('/admin/projects')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }
        $project->delete();

        return redirect('/admin/projects')->with('success', 'Project deleted successfully.');
    }
}