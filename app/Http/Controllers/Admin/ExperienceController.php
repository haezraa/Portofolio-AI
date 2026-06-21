<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::orderBy('start_date', 'desc')->get();

        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Experiences/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_or_organization' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
        ]);

        Experience::create($validated);

        return redirect('/admin/experiences')->with('success', 'Experience created successfully.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('Admin/Experiences/Edit', [
            'experience' => $experience,
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'company_or_organization' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description_id' => 'required|string',
            'description_en' => 'nullable|string',
        ]);

        $experience->update($validated);

        return redirect('/admin/experiences')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect('/admin/experiences')->with('success', 'Experience deleted successfully.');
    }
}