<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Education::orderBy('start_year', 'desc')->get();

        return Inertia::render('Admin/Educations/Index', [
            'educations' => $educations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Educations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1990|max:2030',
            'end_year' => 'nullable|integer|min:1990|max:2030',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
        ]);

        Education::create($validated);

        return redirect('/admin/educations')->with('success', 'Education created successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('Admin/Educations/Edit', [
            'education' => $education,
        ]);
    }

    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1990|max:2030',
            'end_year' => 'nullable|integer|min:1990|max:2030',
            'description_id' => 'nullable|string',
            'description_en' => 'nullable|string',
        ]);

        $education->update($validated);

        return redirect('/admin/educations')->with('success', 'Education updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect('/admin/educations')->with('success', 'Education deleted successfully.');
    }
}