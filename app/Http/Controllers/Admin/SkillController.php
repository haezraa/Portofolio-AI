<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Skills/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'level' => 'nullable|integer|min:1|max:10',
            'logo' => 'nullable|string|max:255',
        ]);

        Skill::create($validated);

        return redirect('/admin/skills')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'level' => 'nullable|integer|min:1|max:10',
            'logo' => 'nullable|string|max:255',
        ]);

        $skill->update($validated);

        return redirect('/admin/skills')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect('/admin/skills')->with('success', 'Skill deleted successfully.');
    }
}