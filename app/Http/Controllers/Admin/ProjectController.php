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
        // Antisipasi jika frontend mengirimkan 'description' alih-alih 'description_id'
        if (!$request->has('description_id') && $request->has('description')) {
            $request->merge(['description_id' => $request->description]);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
            'technologies' => 'required|string', // FIX: Terima sebagai string terlebih dahulu
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
        ]);

        // FIX: Ubah string koma ("Laravel, React") menjadi array JSON ["Laravel", "React"]
        if (isset($validated['technologies']) && is_string($validated['technologies'])) {
            $validated['technologies'] = array_values(array_filter(array_map('trim', explode(',', $validated['technologies']))));
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
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
        // Antisipasi jika frontend mengirimkan 'description' alih-alih 'description_id'
        if (!$request->has('description_id') && $request->has('description')) {
            $request->merge(['description_id' => $request->description]);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
            'technologies' => 'required|string', // FIX: Terima sebagai string
            'project_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
        ]);

        // FIX: Ubah string koma ("Laravel, React") menjadi array JSON ["Laravel", "React"]
        if (isset($validated['technologies']) && is_string($validated['technologies'])) {
            $validated['technologies'] = array_values(array_filter(array_map('trim', explode(',', $validated['technologies']))));
        }

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
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